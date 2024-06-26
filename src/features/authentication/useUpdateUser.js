import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth.js";
import toast from "react-hot-toast";

export function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: (data) => {
            toast.success('User successfully edited');

            queryClient.setQueryData(['user'], data.user);
            queryClient.invalidateQueries({queryKey: ['user'] });
        },
        onError: (err) => {
            toast.error(err.message);
        }
    });

    return {
        isUpdating,
        updateUser
    }
}
