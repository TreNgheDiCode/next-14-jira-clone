import { getCurrentUser } from "@/features/auth/actions";
import { getWorkspace } from "@/features/workspaces/actions";
import { redirect } from "next/navigation";

export default async function WorkspaceIdPage({
  params,
}: {
  params: { workspaceId: string };
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const workspace = await getWorkspace({ workspaceId: params.workspaceId });
  if (!workspace) redirect("/workspaces/create");

  return <div></div>;
}
