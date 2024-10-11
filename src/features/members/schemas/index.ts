import { z } from "zod";
import { MemberRole } from "../types";

export const queryMembersSchema = z.object({ workspaceId: z.string() });
export const updateMemberRoleSchema = z.object({
  role: z.nativeEnum(MemberRole),
});
