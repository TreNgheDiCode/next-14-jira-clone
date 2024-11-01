"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/hooks/use-get-members";
import { useGeProjects } from "@/features/projects/hooks/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Loader } from "lucide-react";
import { useGetTask } from "../hooks/use-get-task";
import UpdateTaskForm from "./updateTaskForm";

interface Props {
  onCancel: () => void;
  id: string;
}

export default function UpdateTaskFormWrapper({ onCancel, id }: Props) {
  const workspaceId = useWorkspaceId();

  const { data: initialValues, isLoading: isLoadingTask } = useGetTask({
    taskId: id,
  });

  const { data: projects, isLoading: isLoadingProjects } = useGeProjects({
    workspaceId,
  });

  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });

  const projectOptions = projects?.documents.map((project) => ({
    id: project.$id,
    name: project.name,
    imageUrl: project.imageUrl,
  }));

  const memberOptions = members?.documents.map((member) => ({
    id: member.$id,
    name: member.name,
  }));

  const isLoading = isLoadingProjects || isLoadingMembers || isLoadingTask;

  if (isLoading) {
    <Card className="w-full h-[714px] border-none shadow-none">
      <CardContent className="flex items-center justify-center h-full">
        <Loader className="size-5 animate-spin text-muted-foreground" />
      </CardContent>
    </Card>;
  } else if (!initialValues) return null;
  else
    return (
      <UpdateTaskForm
        onCancel={onCancel}
        projectOptions={projectOptions ?? []}
        memberOptions={memberOptions ?? []}
        initialValues={initialValues}
      />
    );
}
