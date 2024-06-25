import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings.js";
import toast from "react-hot-toast";

export function useDeleteBooking() {
    const queryClient = useQueryClient(); // gives access to query client

    const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
        mutationFn: (id) => deleteBookingApi(id),
        onSuccess: () => {
            toast.success('Booking successfully deleted');
            queryClient.invalidateQueries({ //automatically invalidate queries after deletion, forcing re-fetching
                queryKey: ['bookings']
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {
        isDeleting,
        deleteBooking
    };
}
