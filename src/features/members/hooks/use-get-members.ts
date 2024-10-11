import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useGetMembers = ({ workspaceId }: { workspaceId: string }) => {
  const query = useQuery({
    queryKey: ["members", workspaceId],
    queryFn: async () => {
      const res = await client.api.members.$get({ query: { workspaceId } });

      if (!res.ok) {
        throw new Error("Failed to fetch members");
      }

      const { data } = await res.json();

      return data;
    },
  });

  return query;
};
