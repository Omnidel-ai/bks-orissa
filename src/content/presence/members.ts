import type { TeamMember } from "./types";

/** Empty until verified Odisha members are supplied. */
export const members: TeamMember[] = [];

export function getDistrictTeamMembers(districtId: string) {
  return members.filter((m) => m.districtId === districtId && !m.blockId);
}

export function getBlockSupportingMembers(districtId: string) {
  return members.filter((m) => m.districtId === districtId && Boolean(m.blockId));
}
