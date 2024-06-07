import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("user account successfully updated");
      queryClient.setQueryData(["user"], user);
    //   queryClient.invalidateQueries({
    //     queryKey: ["user"],
    //   });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateUser };
};
