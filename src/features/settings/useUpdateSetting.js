import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as apiUpdateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: apiUpdateSetting,
    onSuccess: () => {
      toast.success("settings successfully update");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateSetting };
};
