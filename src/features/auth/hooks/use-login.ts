import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Input type
type RequestType = InferRequestType<(typeof client.api.auth.login)["$post"]>;
// Output type
type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login["$post"]({ json });

      if (!response.ok) {
        throw new Error((await response.json()).message);
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast.success(data.message);
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred");
    },
  });

  return mutation;
};
