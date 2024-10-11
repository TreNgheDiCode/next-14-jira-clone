import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Output type
type ResponseType = InferResponseType<(typeof client.api.auth.logout)["$post"]>;

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout["$post"]();

      if (!response.ok) {
        throw new Error((await response.json()).message);
      }

      return response.json();
    },
    onSuccess: (data) => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred");
    },
  });

  return mutation;
};
