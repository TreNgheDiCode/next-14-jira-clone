"use client";

import ResponsiveModal from "@/components/modals/responsiveModal";
import CreateWorkspaceForm from "./create-workspace-form";
import { useCreateWorkspaceModal } from "../hooks/use-create-workspace-modal";

export default function CreateWorkspaceModal() {
  const { isOpen, setIsOpen, onClose } = useCreateWorkspaceModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkspaceForm onCancel={onClose} />
    </ResponsiveModal>
  );
}
