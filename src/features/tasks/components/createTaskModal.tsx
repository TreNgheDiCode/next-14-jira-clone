"use client";

import ResponsiveModal from "@/components/modals/responsiveModal";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import CreateTaskFormWrapper from "./createTaskFormlWrapper";

export default function CreateTaskModal() {
  const { isOpen, setIsOpen, onClose } = useCreateTaskModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateTaskFormWrapper onCancel={onClose} />
    </ResponsiveModal>
  );
}
