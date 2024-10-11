import { getCurrentUser } from "@/features/auth/queries";
import MembersList from "@/features/members/components/members-list";
import { getWorkspace } from "@/features/workspaces/queries";
import { redirect } from "next/navigation";

export default async function WorkspaceIdMembersPage({
  params,
}: {
  params: { workspaceId: string };
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const workspace = await getWorkspace({ workspaceId: params.workspaceId });
  if (!workspace) redirect(`/`);

  return (
    <div className="w-full max-w-xl">
      <MembersList />
    </div>
  );
}
