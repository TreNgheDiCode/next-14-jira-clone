"use client";

import ResponsiveModal from "@/components/modals/responsiveModal";
import { useUpdateTaskModal } from "../hooks/use-update-task-modal";
import UpdateTaskFormWrapper from "./updateTaskFormlWrapper";

export default function UpdateTaskModal() {
  const { taskId, onClose } = useUpdateTaskModal();

  return (
    <ResponsiveModal open={!!taskId} onOpenChange={onClose}>
      {taskId && <UpdateTaskFormWrapper id={taskId} onCancel={onClose} />}
    </ResponsiveModal>
  );
}
