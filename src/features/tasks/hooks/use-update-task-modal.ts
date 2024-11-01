import { parseAsString, useQueryState } from "nuqs";

export const useUpdateTaskModal = () => {
  const [taskId, setTaskId] = useQueryState("edit-task", parseAsString);

  const onOpen = (id: string) => setTaskId(id);
  const onClose = () => setTaskId(null);

  return {
    taskId,
    onOpen,
    onClose,
    setTaskId,
  };
};
