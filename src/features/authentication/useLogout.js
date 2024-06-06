import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
const useLogout = () => {
    const navigate = useNavigate();
    const queryClient=useQueryClient()
  const { mutate: logOut, isLoading } = useMutation({
    mutationFn: logoutApi,
      onSuccess: () => {
          queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });
  return { isLoading, logOut };
};

export default useLogout;
