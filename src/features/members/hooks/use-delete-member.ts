import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

// Input type
type RequestType = InferRequestType<
  (typeof client.api.members)[":memberId"]["$delete"]
>;
// Output type
type ResponseType = InferResponseType<
  (typeof client.api.members)[":memberId"]["$delete"],
  200
>;

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.members[":memberId"]["$delete"]({
        param,
      });

      if (!response.ok) {
        throw new Error("Failed to delete member");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Member deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["members", data.workspaceId],
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete member");
    },
  });

  return mutation;
};
