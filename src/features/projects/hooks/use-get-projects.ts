import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface Props {
  workspaceId: string;
}

export const useGeProjects = ({ workspaceId }: Props) => {
  const query = useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: async () => {
      const res = await client.api.projects.$get({ query: { workspaceId } });

      if (!res.ok) {
        throw new Error("Failed to fetch projects");
      }

      const { data } = await res.json();

      return data;
    },
  });

  return query;
};
