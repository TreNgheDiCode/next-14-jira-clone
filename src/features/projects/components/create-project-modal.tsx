"use client";

import ResponsiveModal from "@/components/modals/responsiveModal";
import { useCreateProjectModal } from "../hooks/use-create-project-modal";
import CreateProjectForm from "./create-project-form";

export default function CreateProjectModal() {
  const { isOpen, setIsOpen, onClose } = useCreateProjectModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectForm onCancel={onClose} />
    </ResponsiveModal>
  );
}
