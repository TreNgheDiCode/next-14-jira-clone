import { getCurrentUser } from "@/features/auth/actions";
import { getWorkspace } from "@/features/workspaces/actions";
import UpdateWorkspaceForm from "@/features/workspaces/components/update-workspace-form";
import { redirect } from "next/navigation";

export default async function WorkspaceIdSettingsPage({
  params,
}: {
  params: { workspaceId: string };
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const initialValues = await getWorkspace({ workspaceId: params.workspaceId });

  if (!initialValues) redirect(`/workspaces/${params.workspaceId}`);

  return (
    <div className="w-full max-w-2xl">
      <UpdateWorkspaceForm initialValues={initialValues} />
    </div>
  );
}
