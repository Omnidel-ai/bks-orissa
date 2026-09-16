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
import { LATIN_SCRIPT_MESSAGE_OR } from "@/lib/district-members/latin-script";
import { DEFAULT_DISTRICT_ID } from "@/lib/district-members/types";

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

const catalog = getDistrictCatalog();

export default function DistrictMembersAdmin() {
  const key = useSyncExternalStore(keySubscribe, keySnapshot, () => "");
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
    async (adminKey: string, id: string) => {
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
          throw new Error("ଆଡମିନ୍ କି ସଠିକ୍ ନୁହେଁ।");
        }
        if (res.status === 503) {
          setDbConfigured(false);
          setItems([]);
          setCounts({ total: 0, published: 0, draft: 0 });
          const body = await res.json().catch(() => ({}));
          setError(
            body?.messageOr ||
              "ଡାଟାବେସ ଏପର୍ଯ୍ୟନ୍ତ ସଂଯୋଗ ହୋଇନାହିଁ। ମାଇଗ୍ରେସନ୍ ପ୍ରୟୋଗ ପରେ କାମ କରିବ।",
          );
          return;
        }
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.messageOr || body?.error || "ତଥ୍ୟ ଲୋଡ୍ କରାଯାଇପାରିଲା ନାହିଁ।");
        }
        setDbConfigured(true);
        const body = (await res.json()) as {
          items: AdminMember[];
          counts: { total: number; published: number; draft: number };
        };
        setItems(body.items);
        setCounts(body.counts);
        await loadPresence(adminKey, id);
      } catch (err) {
        setError(err instanceof Error ? err.message : "ତଥ୍ୟ ଲୋଡ୍ କରାଯାଇପାରିଲା ନାହିଁ।");
      } finally {
        setLoading(false);
      }
    },
    [search, statusFilter, loadPresence],
  );

  useEffect(() => {
    if (!key) return;
    const t = setTimeout(() => void load(key, districtId), 0);
    return () => clearTimeout(t);
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

  function submitKey() {
    const value = keyInput.trim();
    if (!value) return;
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
        throw new Error(body?.messageOr || body?.error || "ସ୍ଥିତି ଅଦ୍ୟତନ ବିଫଳ।");
      }
      setDistrictStatus(next);
      setSuccess("ଜିଲ୍ଲା Presence ସ୍ଥିତି ଅଦ୍ୟତନ ହୋଇଛି।");
    } catch (err) {
      setError(err instanceof Error ? err.message : "ସ୍ଥିତି ଅଦ୍ୟତନ ବିଫଳ।");
    } finally {
      setSaving(false);
    }
  }

  async function saveMember() {
    if (!key) return;
    if (!form.full_name.trim()) {
      setError("ନାମ ଲେଖନ୍ତୁ।");
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
          throw new Error(body?.messageOr || body?.error || "ସଂରକ୍ଷଣ ବିଫଳ।");
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
          throw new Error(body?.messageOr || body?.error || "ଅଦ୍ୟତନ ବିଫଳ।");
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
            photoBody?.messageOr || photoBody?.error || "ଛବି ଅପଲୋଡ୍ ବିଫଳ।",
          );
        }
      }

      setSuccess("ସଦସ୍ୟ ତଥ୍ୟ ସଫଳତାର ସହ ସଂରକ୍ଷିତ ହୋଇଛି।");
      setMode("list");
      setEditingId(null);
      setForm(EMPTY_FORM);
      setPhotoFile(null);
      await load(key, districtId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "ସଂରକ୍ଷଣ କରାଯାଇପାରିଲା ନାହିଁ।");
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
        throw new Error(body?.messageOr || body?.error || "କାମ ବିଫଳ ହେଲା।");
      }
      setSuccess("ଅଦ୍ୟତନ ହୋଇଛି।");
      await load(key, districtId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "କାମ ବିଫଳ ହେଲା।");
    } finally {
      setSaving(false);
    }
  }

  async function archiveMember(id: string, name: string) {
    if (!key) return;
    const ok = window.confirm(
      `"${name}" ସଦସ୍ୟଙ୍କୁ ସକ୍ରିୟ ତାଲିକାରୁ ହଟାଇବେ କି?\n\nଏହା soft archive — ତଥ୍ୟ ସ୍ଥାୟୀ ଭାବେ ଡିଲିଟ୍ ହେବ ନାହିଁ।`,
    );
    if (!ok) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/district-members/${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": key },
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body?.messageOr || body?.error || "ହଟାଇହେଲା ନାହିଁ।");
      }
      setSuccess("ସଦସ୍ୟଙ୍କୁ ପ୍ରକାଶରୁ ହଟାଇ ଦିଆଯାଇଛି।");
      await load(key, districtId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "ହଟାଇହେଲା ନାହିଁ।");
    } finally {
      setSaving(false);
    }
  }

  async function moveOrder(id: string, direction: "up" | "down") {
    if (!items || !key) return;
    const idx = items.findIndex((m) => m.id === id);
    if (idx < 0) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= items.length) return;
    const a = items[idx];
    const b = items[swapIdx];
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

  if (!key) {
    return (
      <main className="wrap admin-district-members" style={{ maxWidth: 480, padding: "4rem 1.25rem" }}>
        <p className="kicker" style={{ color: "var(--paddy-gold)" }}>
          ଓଡ଼ିଶା — ୩୦ ଜିଲ୍ଲା
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", color: "var(--field-green)", marginTop: 0 }}>
          BKS ସଦସ୍ୟ ପରିଚାଳନା
        </h1>
        <p style={{ color: "var(--ink-soft)" }}>
          ଅନୁମୋଦିତ ଆଡମିନ୍ କି ସହ ପ୍ରବେଶ କରନ୍ତୁ। କି କେବଳ ଏହି ବ୍ରାଉଜର୍ ଟ୍ୟାବରେ ମନେ ରଖାଯାଏ।
        </p>
        <label className="admin-field">
          ଆଡମିନ୍ କି
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
          ପ୍ରବେଶ କରନ୍ତୁ
        </button>
      </main>
    );
  }

  return (
    <main className="wrap admin-district-members" style={{ padding: "2rem 1.25rem 4rem" }}>
      <div className="admin-header-row">
        <div>
          <p className="kicker" style={{ color: "var(--paddy-gold)", marginBottom: 0 }}>
            ଓଡ଼ିଶା
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", color: "var(--field-green)", margin: "0.25rem 0" }}>
            BKS ସଦସ୍ୟ ପରିଚାଳନା
          </h1>
        </div>
        <button
          type="button"
          className="admin-btn ghost"
          onClick={() => {
            writeStoredKey("");
            setItems(null);
          }}
        >
          ପ୍ରସ୍ଥାନ
        </button>
      </div>

      <label className="admin-field">
        ଜିଲ୍ଲା ଚୟନ
        <select
          value={districtId}
          onChange={(e) => changeDistrict(e.target.value)}
        >
          {catalog.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name.or} / {d.officialName}
            </option>
          ))}
        </select>
      </label>

      <div className="admin-toolbar" style={{ marginBottom: "1rem" }}>
        <label className="admin-field inline">
          Presence ସ୍ଥିତି (ମାନୁଆଲ୍)
          <select
            value={districtStatus}
            disabled={!dbConfigured || saving}
            onChange={(e) => void saveDistrictStatus(e.target.value as PresenceStatus)}
          >
            <option value="upcoming">Upcoming</option>
            <option value="indicated">Indicated</option>
            <option value="active">Active</option>
          </select>
        </label>
        <p style={{ margin: 0, color: "var(--ink-mute)", fontSize: "0.9rem" }}>
          {selectedDistrict?.name.or} — ପ୍ରକାଶିତ ସଦସ୍ୟ ଥିଲେ ସ୍ୱୟଂ Active/Green ହୁଏ।
        </p>
      </div>

      {!dbConfigured ? (
        <p className="note-block" role="status">
          ଡାଟାବେସ ଏପର୍ଯ୍ୟନ୍ତ ସଂଯୋଗ ହୋଇନାହିଁ। ମାଇଗ୍ରେସନ୍ ଓ `.env.local` ସେଟ୍ ହେବା ପରେ କାମ କରିବ।
        </p>
      ) : null}

      <div className="admin-stats" aria-label="ସଦସ୍ୟ ସଂଖ୍ୟା">
        <div>
          <strong>{counts.total}</strong>
          <span>ମୋଟ ସଦସ୍ୟ</span>
        </div>
        <div>
          <strong>{counts.published}</strong>
          <span>ପ୍ରକାଶିତ</span>
        </div>
        <div>
          <strong>{counts.draft}</strong>
          <span>ଖସଡ଼ା</span>
        </div>
      </div>

      {mode === "list" ? (
        <>
          <div className="admin-toolbar">
            <button type="button" className="admin-btn primary" onClick={openCreate} disabled={!dbConfigured}>
              + ନୂଆ ସଦସ୍ୟ ଯୋଗ କରନ୍ତୁ
            </button>
            <label className="admin-search">
              <span className="sr-only">ଖୋଜନ୍ତୁ</span>
              <input
                type="search"
                placeholder="ନାମ / ଗାଁ / ଅଞ୍ଚଳ ଦ୍ୱାରା ଖୋଜନ୍ତୁ"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <label className="admin-field inline">
              ଫିଲ୍ଟର
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as "all" | "published" | "draft")
                }
              >
                <option value="all">ସବୁ</option>
                <option value="published">ପ୍ରକାଶିତ</option>
                <option value="draft">ଖସଡ଼ା</option>
              </select>
            </label>
          </div>

          {loading ? <p role="status">ସଦସ୍ୟ ତଥ୍ୟ ଲୋଡ୍ ହେଉଛି...</p> : null}
          {error ? <p className="admin-msg error" role="alert">{error}</p> : null}
          {success ? <p className="admin-msg ok" role="status">{success}</p> : null}

          {!loading && sorted.length === 0 ? (
            <p className="note-block">ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ସଦସ୍ୟ ନାହାନ୍ତି। ନୂଆ ସଦସ୍ୟ ଯୋଗ କରନ୍ତୁ।</p>
          ) : (
            <ul className="admin-member-list">
              {sorted.map((m, index) => (
                <li key={m.id} className="admin-member-row">
                  <div className="admin-member-main">
                    <strong>{m.full_name}</strong>
                    <span className={`admin-pill ${m.is_published ? "pub" : "draft"}`}>
                      {m.is_published ? "ପ୍ରକାଶିତ" : "ଖସଡ଼ା"}
                    </span>
                    <p>
                      {[m.designation, m.village, m.area].filter(Boolean).join(" · ") ||
                        "ଅତିରିକ୍ତ ତଥ୍ୟ ନାହିଁ"}
                    </p>
                  </div>
                  <div className="admin-member-actions">
                    <button type="button" className="admin-btn" onClick={() => openEdit(m)} disabled={saving}>
                      ସମ୍ପାଦନା
                    </button>
                    <button
                      type="button"
                      className="admin-btn"
                      onClick={() =>
                        void patchMember(m.id, { is_published: !m.is_published })
                      }
                      disabled={saving}
                    >
                      {m.is_published ? "ଲୁଚାନ୍ତୁ" : "ପ୍ରକାଶ କରନ୍ତୁ"}
                    </button>
                    <button
                      type="button"
                      className="admin-btn"
                      onClick={() => void moveOrder(m.id, "up")}
                      disabled={saving || index === 0}
                      aria-label="ଉପରକୁ"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className="admin-btn"
                      onClick={() => void moveOrder(m.id, "down")}
                      disabled={saving || index === sorted.length - 1}
                      aria-label="ତଳକୁ"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      className="admin-btn danger"
                      onClick={() => void archiveMember(m.id, m.full_name)}
                      disabled={saving}
                    >
                      ସଂରକ୍ଷଣାଗାର
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
            {mode === "create" ? "ନୂଆ ସଦସ୍ୟ ଯୋଗ" : "ସଦସ୍ୟ ସମ୍ପାଦନା"} — {selectedDistrict?.name.or}
          </h2>
          <p className="note-block" style={{ marginTop: 0 }}>
            {LATIN_SCRIPT_MESSAGE_OR}
          </p>
          {error ? <p className="admin-msg error" role="alert">{error}</p> : null}

          <label className="admin-field">
            ନାମ * (English/Latin)
            <input
              value={form.full_name}
              onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
              placeholder="Saroj Kumar Bhuyan"
              lang="en"
              required
            />
          </label>
          <label className="admin-field">
            ପଦବୀ / ଦାୟିତ୍ୱ (English/Latin)
            <input
              value={form.designation}
              onChange={(e) => setForm((f) => ({ ...f, designation: e.target.value }))}
              lang="en"
            />
          </label>
          <label className="admin-field">
            ଗାଁ / ସ୍ଥାନ (English/Latin)
            <input
              value={form.village}
              onChange={(e) => setForm((f) => ({ ...f, village: e.target.value }))}
              lang="en"
            />
          </label>
          <label className="admin-field">
            ବ୍ଲକ (English/Latin)
            <input
              value={form.block}
              onChange={(e) => setForm((f) => ({ ...f, block: e.target.value }))}
              lang="en"
            />
          </label>
          <label className="admin-field">
            ଅଞ୍ଚଳ (English/Latin)
            <input
              value={form.area}
              onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))}
              lang="en"
            />
          </label>
          <label className="admin-field">
            ସଂକ୍ଷିପ୍ତ ପରିଚୟ (English/Latin)
            <textarea
              rows={4}
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              lang="en"
            />
          </label>
          <label className="admin-field">
            ବିଭାଗ (ଐଚ୍ଛିକ, English/Latin)
            <input
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              lang="en"
            />
          </label>

          <fieldset className="admin-photo-field">
            <legend>ଛବି</legend>
            {photoPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photoPreview} alt="ଚୟନିତ ଛବି" className="admin-photo-preview" />
            ) : null}
            <div className="admin-photo-actions">
              <label className="admin-btn">
                ଛବି ଉଠାନ୍ତୁ
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  hidden
                  onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)}
                />
              </label>
              <label className="admin-btn">
                ଛବି ବାଛନ୍ତୁ
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  hidden
                  onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)}
                />
              </label>
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
            ବର୍ତ୍ତମାନ ପ୍ରକାଶ କରନ୍ତୁ
          </label>

          <div className="admin-form-actions">
            <button type="button" className="admin-btn primary" onClick={() => void saveMember()} disabled={saving}>
              ସଂରକ୍ଷଣ କରନ୍ତୁ
            </button>
            <button type="button" className="admin-btn" onClick={cancelForm} disabled={saving}>
              ବାତିଲ୍
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
