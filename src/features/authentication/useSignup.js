import { useMutation } from "@tanstack/react-query";
import { SignUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignup() {

    const { isLoading, mutate: signup } = useMutation({
        mutationFn: signUpApi,
        onSuccess: (user) => {
            console.log(user);
            toast.success("Account successfully created! please verified your email address")
        }
        
    })
    return {isLoading,signup}
}

export default useSignup;
