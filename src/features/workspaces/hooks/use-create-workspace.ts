import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

// Input type
type RequestType = InferRequestType<(typeof client.api.workspaces)["$post"]>;
// Output type
type ResponseType = InferResponseType<(typeof client.api.workspaces)["$post"]>;

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api.workspaces["$post"]({ form });

      const jsonResponse = await response.json();

      if (!response.ok) {
        if ("error" in jsonResponse) {
          // The 'error' property exists in the JSON response
          throw new Error(jsonResponse.error || "Failed to create workspace");
        } else {
          // Fallback if the 'error' property does not exist
          throw new Error("Failed to create workspace");
        }
      } else {
        return jsonResponse;
      }
    },
    onSuccess: () => {
      toast.success("Workspace created successfully");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create workspace");
    },
  });

  return mutation;
};
