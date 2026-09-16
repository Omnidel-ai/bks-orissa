"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type { PresenceStatus } from "@/content/presence";
import { getDistrictCatalog } from "@/lib/district-members/catalog";
import {
  LATIN_SCRIPT_MESSAGE_EN,
  LATIN_SCRIPT_MESSAGE_HI,
  LATIN_SCRIPT_MESSAGE_OR,
} from "@/lib/district-members/latin-script";
import { DEFAULT_DISTRICT_ID } from "@/lib/district-members/types";
import { adminT } from "@/lib/admin-i18n";
import type { Locale } from "@/lib/i18n";
import { useAdminLocale } from "@/lib/useAdminLocale";

type AdminMember = {
  id: string;
  district_id: string;
  slug: string;
  full_name: string;
  photo_path: string | null;
  designation: string | null;
  village: string | null;
  block: string | null;
  area: string | null;
  bio: string | null;
  category: string | null;
  display_order: number;
  is_published: boolean;
  is_archived: boolean;
};

type FormState = {
  full_name: string;
  designation: string;
  village: string;
  block: string;
  area: string;
  bio: string;
  category: string;
  is_published: boolean;
};

const EMPTY_FORM: FormState = {
  full_name: "",
  designation: "",
  village: "",
  block: "",
  area: "",
  bio: "",
  category: "",
  is_published: false,
};

const KEY_STORAGE = "bks-odisha-admin-key";
const DISTRICT_STORAGE = "bks-odisha-admin-district-id";
const keyListeners = new Set<() => void>();

function keySubscribe(cb: () => void) {
  keyListeners.add(cb);
  return () => {
    keyListeners.delete(cb);
  };
}

function keySnapshot(): string {
  try {
    return window.sessionStorage.getItem(KEY_STORAGE) ?? "";
  } catch {
    return "";
  }
}

function writeStoredKey(value: string) {
  try {
    if (value) window.sessionStorage.setItem(KEY_STORAGE, value);
    else window.sessionStorage.removeItem(KEY_STORAGE);
  } catch {
    /* ignore */
  }
  for (const cb of keyListeners) cb();
}

function readStoredDistrict(): string {
  try {
    return window.sessionStorage.getItem(DISTRICT_STORAGE) || DEFAULT_DISTRICT_ID;
  } catch {
    return DEFAULT_DISTRICT_ID;
  }
}

function writeStoredDistrict(id: string) {
  try {
    window.sessionStorage.setItem(DISTRICT_STORAGE, id);
  } catch {
    /* ignore */
  }
}

function memberToForm(m: AdminMember): FormState {
  return {
    full_name: m.full_name,
    designation: m.designation ?? "",
    village: m.village ?? "",
    block: m.block ?? "",
    area: m.area ?? "",
    bio: m.bio ?? "",
    category: m.category ?? "",
    is_published: m.is_published,
  };
}

function latinHint(locale: Locale) {
  if (locale === "hi") return LATIN_SCRIPT_MESSAGE_HI;
  if (locale === "or") return LATIN_SCRIPT_MESSAGE_OR;
  return LATIN_SCRIPT_MESSAGE_EN;
}

const catalog = getDistrictCatalog();

type AuthGate = "login" | "verifying" | "ready";

export default function DistrictMembersAdmin() {
  const [locale, setLocale] = useAdminLocale();
  const copy = adminT(locale);
  const key = useSyncExternalStore(keySubscribe, keySnapshot, () => "");
  const [authGate, setAuthGate] = useState<AuthGate>("login");
  const [keyInput, setKeyInput] = useState("");
  const [districtId, setDistrictId] = useState<string>(DEFAULT_DISTRICT_ID);
  const [districtStatus, setDistrictStatus] = useState<PresenceStatus>("upcoming");
  const [items, setItems] = useState<AdminMember[] | null>(null);
  const [counts, setCounts] = useState({ total: 0, published: 0, draft: 0 });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [mode, setMode] = useState<"list" | "create" | "edit">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [dbConfigured, setDbConfigured] = useState(true);

  useEffect(() => {
    setDistrictId(readStoredDistrict());
  }, []);

  const selectedDistrict = useMemo(
    () => catalog.find((d) => d.id === districtId) ?? catalog[0],
    [districtId],
  );

  const loadPresence = useCallback(async (adminKey: string, id: string) => {
    try {
      const res = await fetch("/api/admin/district-presence", {
        headers: { "x-admin-key": adminKey },
      });
      if (!res.ok) return;
      const body = (await res.json()) as {
        items: { district_id: string; status: PresenceStatus }[];
      };
      const row = body.items?.find((x) => x.district_id === id);
      if (row?.status) setDistrictStatus(row.status);
      else {
        const fallback = catalog.find((d) => d.id === id)?.status;
        if (fallback) setDistrictStatus(fallback);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const load = useCallback(
    async (adminKey: string, id: string): Promise<boolean> => {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({
          district_id: id,
          status: statusFilter,
        });
        if (search.trim()) params.set("q", search.trim());
        const res = await fetch(`/api/admin/district-members?${params}`, {
          headers: { "x-admin-key": adminKey },
        });
        if (res.status === 401) {
          writeStoredKey("");
          setAuthGate("login");
          setItems(null);
          setError(copy.errBadKey);
          return false;
        }
        if (res.status === 503) {
          setDbConfigured(false);
          setItems([]);
          setCounts({ total: 0, published: 0, draft: 0 });
          const body = await res.json().catch(() => ({}));
          setError(
            (body?.messageOr as string) ||
              (body?.message as string) ||
              copy.dbPendingOr,
          );
          return true;
        }
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(
            (body?.messageOr as string) || (body?.error as string) || copy.errLoad,
          );
        }
        setDbConfigured(true);
        const body = (await res.json()) as {
          items: AdminMember[];
          counts: { total: number; published: number; draft: number };
        };
        setItems(body.items);
        setCounts(body.counts);
        await loadPresence(adminKey, id);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : copy.errLoad);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [search, statusFilter, loadPresence, copy.errBadKey, copy.errLoad, copy.dbPendingOr],
  );

  useEffect(() => {
    if (!key) {
      setAuthGate("login");
      return;
    }
    let cancelled = false;
    setAuthGate((prev) => (prev === "ready" ? "ready" : "verifying"));
    const t = setTimeout(() => {
      void (async () => {
        const ok = await load(key, districtId);
        if (cancelled) return;
        if (ok) {
          setAuthGate("ready");
          return;
        }
        // 401 clears the stored key; only then return to login.
        // Other errors keep the panel open with the message.
        try {
          const still = window.sessionStorage.getItem(KEY_STORAGE) ?? "";
          setAuthGate(still ? "ready" : "login");
        } catch {
          setAuthGate("login");
        }
      })();
    }, 0);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [key, load, districtId]);

  useEffect(() => {
    if (!photoFile) {
      setPhotoPreview(null);
      return;
    }
    const url = URL.createObjectURL(photoFile);
    setPhotoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [photoFile]);

  const sorted = useMemo(() => items ?? [], [items]);

  const languageSwitcher = (
    <label className="admin-field inline admin-lang-switch">
      {copy.language}
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        aria-label={copy.language}
      >
        <option value="en">English</option>
        <option value="or">ଓଡ଼ିଆ</option>
        <option value="hi">हिन्दी</option>
      </select>
    </label>
  );

  function submitKey() {
    const value = keyInput.trim();
    if (!value) return;
    setError("");
    setAuthGate("verifying");
    setKeyInput("");
    writeStoredKey(value);
  }

  function changeDistrict(id: string) {
    writeStoredDistrict(id);
    setDistrictId(id);
    setMode("list");
    setEditingId(null);
    setForm(EMPTY_FORM);
    setSuccess("");
    setError("");
  }

  function openCreate() {
    setMode("create");
    setEditingId(null);
    setForm(EMPTY_FORM);
    setPhotoFile(null);
    setSuccess("");
    setError("");
  }

  function openEdit(m: AdminMember) {
    setMode("edit");
    setEditingId(m.id);
    setForm(memberToForm(m));
    setPhotoFile(null);
    setSuccess("");
    setError("");
  }

  function cancelForm() {
    setMode("list");
    setEditingId(null);
    setForm(EMPTY_FORM);
    setPhotoFile(null);
  }

  async function saveDistrictStatus(next: PresenceStatus) {
    if (!key) return;
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/admin/district-presence", {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "x-admin-key": key,
        },
        body: JSON.stringify({ district_id: districtId, status: next }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          (body?.messageOr as string) || (body?.error as string) || copy.errStatus,
        );
      }
      setDistrictStatus(next);
      setSuccess(copy.okStatus);
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.errStatus);
    } finally {
      setSaving(false);
    }
  }

  async function saveMember() {
    if (!key) return;
    if (!form.full_name.trim()) {
      setError(copy.errNameRequired);
      return;
    }
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const payload = {
        district_id: districtId,
        full_name: form.full_name.trim(),
        designation: form.designation.trim() || null,
        village: form.village.trim() || null,
        block: form.block.trim() || null,
        area: form.area.trim() || null,
        bio: form.bio.trim() || null,
        category: form.category.trim() || null,
        is_published: form.is_published,
      };

      let memberId = editingId;
      if (mode === "create") {
        const res = await fetch("/api/admin/district-members", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-admin-key": key,
          },
          body: JSON.stringify(payload),
        });
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(
            (body?.messageOr as string) || (body?.error as string) || copy.errSave,
          );
        }
        memberId = body.item.id as string;
      } else if (editingId) {
        const res = await fetch(`/api/admin/district-members/${editingId}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            "x-admin-key": key,
          },
          body: JSON.stringify(payload),
        });
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(
            (body?.messageOr as string) || (body?.error as string) || copy.errSave,
          );
        }
      }

      if (photoFile && memberId) {
        const fd = new FormData();
        fd.set("photo", photoFile);
        const photoRes = await fetch(
          `/api/admin/district-members/${memberId}/photo`,
          {
            method: "POST",
            headers: { "x-admin-key": key },
            body: fd,
          },
        );
        const photoBody = await photoRes.json().catch(() => ({}));
        if (!photoRes.ok) {
          throw new Error(
            (photoBody?.messageOr as string) ||
              (photoBody?.error as string) ||
              copy.errPhoto,
          );
        }
      }

      setSuccess(copy.okSaved);
      setMode("list");
      setEditingId(null);
      setForm(EMPTY_FORM);
      setPhotoFile(null);
      await load(key, districtId);
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.errSave);
    } finally {
      setSaving(false);
    }
  }

  async function patchMember(id: string, patch: Record<string, unknown>) {
    if (!key) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/district-members/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "x-admin-key": key,
        },
        body: JSON.stringify(patch),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          (body?.messageOr as string) || (body?.error as string) || copy.errSave,
        );
      }
      await load(key, districtId);
      setSuccess(copy.okSaved);
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.errSave);
    } finally {
      setSaving(false);
    }
  }

  async function archiveMember(id: string, name: string) {
    if (!key) return;
    if (!window.confirm(`${copy.archiveConfirm}\n\n${name}`)) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/district-members/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "x-admin-key": key,
        },
        body: JSON.stringify({ is_archived: true, is_published: false }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          (body?.messageOr as string) || (body?.error as string) || copy.errArchive,
        );
      }
      setSuccess(copy.okArchived);
      await load(key, districtId);
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.errArchive);
    } finally {
      setSaving(false);
    }
  }

  async function moveOrder(id: string, direction: "up" | "down") {
    if (!key || !items) return;
    const index = items.findIndex((m) => m.id === id);
    if (index < 0) return;
    const swapWith = direction === "up" ? index - 1 : index + 1;
    if (swapWith < 0 || swapWith >= items.length) return;
    const a = items[index];
    const b = items[swapWith];
    setSaving(true);
    try {
      await Promise.all([
        fetch(`/api/admin/district-members/${a.id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            "x-admin-key": key,
          },
          body: JSON.stringify({ display_order: b.display_order }),
        }),
        fetch(`/api/admin/district-members/${b.id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            "x-admin-key": key,
          },
          body: JSON.stringify({ display_order: a.display_order }),
        }),
      ]);
      await load(key, districtId);
    } finally {
      setSaving(false);
    }
  }

  if (authGate === "login" || !key) {
    return (
      <main className="wrap admin-district-members" style={{ maxWidth: 480, padding: "4rem 1.25rem" }}>
        <div className="admin-header-row" style={{ marginBottom: "1rem" }}>
          <div>
            <p className="kicker" style={{ color: "var(--paddy-gold)" }}>
              {copy.kicker}
            </p>
            <h1 style={{ fontFamily: "var(--font-display)", color: "var(--field-green)", marginTop: 0 }}>
              {copy.title}
            </h1>
          </div>
          {languageSwitcher}
        </div>
        <p style={{ color: "var(--ink-soft)" }}>{copy.loginHint}</p>
        <label className="admin-field">
          {copy.adminKeyLabel}
          <input
            type="password"
            value={keyInput}
            autoComplete="off"
            onChange={(e) => setKeyInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submitKey();
            }}
          />
        </label>
        {error ? <p className="admin-msg error" role="alert">{error}</p> : null}
        <button
          type="button"
          className="admin-btn primary"
          onClick={submitKey}
          disabled={!keyInput.trim()}
        >
          {copy.enter}
        </button>
      </main>
    );
  }

  if (authGate === "verifying") {
    return (
      <main className="wrap admin-district-members" style={{ maxWidth: 480, padding: "4rem 1.25rem" }}>
        <div className="admin-header-row" style={{ marginBottom: "1rem" }}>
          <div>
            <p className="kicker" style={{ color: "var(--paddy-gold)" }}>
              {copy.kicker}
            </p>
            <h1 style={{ fontFamily: "var(--font-display)", color: "var(--field-green)", marginTop: 0 }}>
              {copy.title}
            </h1>
          </div>
          {languageSwitcher}
        </div>
        <p role="status" style={{ color: "var(--ink-soft)" }}>
          {copy.verifying}
        </p>
      </main>
    );
  }

  return (
    <main className="wrap admin-district-members" style={{ padding: "2rem 1.25rem 4rem" }}>
      <div className="admin-header-row">
        <div>
          <p className="kicker" style={{ color: "var(--paddy-gold)", marginBottom: 0 }}>
            {copy.kicker}
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", color: "var(--field-green)", margin: "0.25rem 0" }}>
            {copy.title}
          </h1>
        </div>
        <div className="admin-header-actions">
          {languageSwitcher}
          <button
            type="button"
            className="admin-btn ghost"
            onClick={() => {
              writeStoredKey("");
              setItems(null);
              setAuthGate("login");
            }}
          >
            {copy.leave}
          </button>
        </div>
      </div>

      <label className="admin-field">
        {copy.districtSelect}
        <select value={districtId} onChange={(e) => changeDistrict(e.target.value)}>
          {catalog.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name[locale]} / {d.officialName}
            </option>
          ))}
        </select>
      </label>

      <div className="admin-toolbar" style={{ marginBottom: "1rem" }}>
        <label className="admin-field inline">
          {copy.presenceStatusManual}
          <select
            value={districtStatus}
            disabled={!dbConfigured || saving}
            onChange={(e) => void saveDistrictStatus(e.target.value as PresenceStatus)}
          >
            <option value="upcoming">{copy.statusUpcoming}</option>
            <option value="indicated">{copy.statusIndicated}</option>
            <option value="active">{copy.statusActive}</option>
          </select>
        </label>
        <p style={{ margin: 0, color: "var(--ink-mute)", fontSize: "0.9rem" }}>
          {selectedDistrict?.name[locale]} — {copy.autoActiveNote}
        </p>
      </div>

      {!dbConfigured ? (
        <p className="note-block" role="status">
          {copy.dbNotConnected}
        </p>
      ) : null}

      <div className="admin-stats" aria-label={copy.statsTotal}>
        <div>
          <strong>{counts.total}</strong>
          <span>{copy.statsTotal}</span>
        </div>
        <div>
          <strong>{counts.published}</strong>
          <span>{copy.statsPublished}</span>
        </div>
        <div>
          <strong>{counts.draft}</strong>
          <span>{copy.statsDraft}</span>
        </div>
      </div>

      {mode === "list" ? (
        <>
          <div className="admin-toolbar">
            <button type="button" className="admin-btn primary" onClick={openCreate} disabled={!dbConfigured}>
              {copy.addMember}
            </button>
            <label className="admin-search">
              <span className="sr-only">{copy.searchPlaceholder}</span>
              <input
                type="search"
                placeholder={copy.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <label className="admin-field inline">
              {copy.filter}
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as "all" | "published" | "draft")
                }
              >
                <option value="all">{copy.filterAll}</option>
                <option value="published">{copy.filterPublished}</option>
                <option value="draft">{copy.filterDraft}</option>
              </select>
            </label>
          </div>

          {loading ? <p role="status">{copy.loadingMembers}</p> : null}
          {error ? <p className="admin-msg error" role="alert">{error}</p> : null}
          {success ? <p className="admin-msg ok" role="status">{success}</p> : null}

          {!loading && sorted.length === 0 ? (
            <p className="note-block">{copy.emptyMembers}</p>
          ) : (
            <ul className="admin-member-list">
              {sorted.map((m, index) => (
                <li key={m.id} className="admin-member-row">
                  <div className="admin-member-main">
                    <strong>{m.full_name}</strong>
                    <span className={`admin-pill ${m.is_published ? "pub" : "draft"}`}>
                      {m.is_published ? copy.published : copy.draft}
                    </span>
                    <p>
                      {[m.designation, m.village, m.area].filter(Boolean).join(" · ") ||
                        copy.noExtraInfo}
                    </p>
                  </div>
                  <div className="admin-member-actions">
                    <button type="button" className="admin-btn" onClick={() => openEdit(m)} disabled={saving}>
                      {copy.edit}
                    </button>
                    <button
                      type="button"
                      className="admin-btn"
                      onClick={() =>
                        void patchMember(m.id, { is_published: !m.is_published })
                      }
                      disabled={saving}
                    >
                      {m.is_published ? copy.unpublish : copy.publish}
                    </button>
                    <button
                      type="button"
                      className="admin-btn"
                      onClick={() => void moveOrder(m.id, "up")}
                      disabled={saving || index === 0}
                      aria-label={copy.moveUp}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className="admin-btn"
                      onClick={() => void moveOrder(m.id, "down")}
                      disabled={saving || index === sorted.length - 1}
                      aria-label={copy.moveDown}
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      className="admin-btn danger"
                      onClick={() => void archiveMember(m.id, m.full_name)}
                      disabled={saving}
                    >
                      {copy.archive}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <div className="admin-form-panel">
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--field-green)" }}>
            {mode === "create" ? copy.createTitle : copy.editTitle} —{" "}
            {selectedDistrict?.name[locale]}
          </h2>
          <p className="note-block" style={{ marginTop: 0 }}>
            {latinHint(locale)}
          </p>
          {error ? <p className="admin-msg error" role="alert">{error}</p> : null}

          <label className="admin-field">
            {copy.name} *
            <input
              value={form.full_name}
              onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
              placeholder="Saroj Kumar Bhuyan"
              lang="en"
              required
            />
          </label>
          <label className="admin-field">
            {copy.designation}
            <input
              value={form.designation}
              onChange={(e) => setForm((f) => ({ ...f, designation: e.target.value }))}
              lang="en"
            />
          </label>
          <label className="admin-field">
            {copy.village}
            <input
              value={form.village}
              onChange={(e) => setForm((f) => ({ ...f, village: e.target.value }))}
              lang="en"
            />
          </label>
          <label className="admin-field">
            {copy.block}
            <input
              value={form.block}
              onChange={(e) => setForm((f) => ({ ...f, block: e.target.value }))}
              lang="en"
            />
          </label>
          <label className="admin-field">
            {copy.area}
            <input
              value={form.area}
              onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))}
              lang="en"
            />
          </label>
          <label className="admin-field">
            {copy.bio}
            <textarea
              rows={4}
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              lang="en"
            />
          </label>
          <label className="admin-field">
            {copy.category}
            <input
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              lang="en"
            />
          </label>

          <fieldset className="admin-photo-field">
            <legend>{copy.photo}</legend>
            <p className="note-block" style={{ marginTop: 0 }}>
              {copy.photoHint}
            </p>
            {photoPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photoPreview} alt="" className="admin-photo-preview" />
            ) : null}
            <div className="admin-photo-actions">
              <label className="admin-btn">
                {copy.choosePhoto}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  hidden
                  onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)}
                />
              </label>
              {photoFile ? (
                <button
                  type="button"
                  className="admin-btn"
                  onClick={() => setPhotoFile(null)}
                >
                  {copy.clearPhoto}
                </button>
              ) : null}
            </div>
          </fieldset>

          <label className="admin-check">
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={(e) =>
                setForm((f) => ({ ...f, is_published: e.target.checked }))
              }
            />
            {copy.publishCheckbox}
          </label>

          <div className="admin-form-actions">
            <button
              type="button"
              className="admin-btn primary"
              onClick={() => void saveMember()}
              disabled={saving}
            >
              {copy.save}
            </button>
            <button type="button" className="admin-btn" onClick={cancelForm} disabled={saving}>
              {copy.cancel}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
