import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/features/auth/queries";
import ProjectAvatar from "@/features/projects/components/projectAvatar";
import { getProject } from "@/features/projects/queries";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

interface Props {
  params: {
    projectId: string;
  };
}

const TaskViewSwitcher = dynamic(
  () => import("@/features/tasks/components/tastViewSwitcher"),
  { ssr: false }
)

export default async function ProjectIdPage({ params }: Props) {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const initialValues = await getProject({ projectId: params.projectId });

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar
            name={initialValues.name}
            image={initialValues.imageUrl}
            className="size-8"
          />
          <p className="text-lg font-semibold">{initialValues.name}</p>
        </div>
        <div>
          <Button variant="secondary" size="sm" asChild>
            <Link
              href={`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}/settings`}
            >
              <Pencil className="size-4 mr-2" />
              Edit Project
            </Link>
          </Button>
        </div>
      </div>
      <TaskViewSwitcher />
    </div>
  );
}
