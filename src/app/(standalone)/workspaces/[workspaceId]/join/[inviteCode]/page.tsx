import { getCurrentUser } from "@/features/auth/queries";
import JoinWorkspaceForm from "@/features/workspaces/components/join-workspace-form";
import { getWorkspaceInfo } from "@/features/workspaces/queries";
import { redirect } from "next/navigation";

export default async function WorkspaceIdJoinPage({
  params,
}: {
  params: { workspaceId: string };
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const workspace = await getWorkspaceInfo({ workspaceId: params.workspaceId });
  if (!workspace) redirect("/");

  return (
    <div className="w-full max-w-xl">
      <JoinWorkspaceForm initialValues={workspace} />
    </div>
  );
}
