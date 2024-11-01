import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

interface Props {
  taskId: string;
}

export const useGetTask = ({ taskId }: Props) => {
  const query = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      const res = await client.api.tasks[":taskId"].$get({ param: { taskId } });

      if (!res.ok) {
        throw new Error("Failed to fetch task");
      }

      const { data } = await res.json();

      return data;
    },
  });

  return query;
};
