import { getCurrentUser } from "@/features/auth/queries";
import UpdateProjectForm from "@/features/projects/components/update-project-form";
import { getProject } from "@/features/projects/queries";
import { redirect } from "next/navigation";

interface Props {
  params: {
    projectId: string;
  };
}

export default async function ProjectIdSettingsPage({ params }: Props) {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const initialValues = await getProject({
    projectId: params.projectId,
  });

  return (
    <div className="w-full lg:max-w-2xl">
      <UpdateProjectForm initialValues={initialValues} />
    </div>
  );
}
