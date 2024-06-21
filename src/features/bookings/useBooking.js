import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings.js";
import { useParams } from "react-router-dom";

export function useBooking() {
    const { bookingId } = useParams();

    const { isLoading, data: booking, error } = useQuery({
        queryKey: ['cabins'],
        queryFn: () => getBooking(bookingId),
        retry: false // stops retrying if data does not exist
    });

    return {
        isLoading,
        error,
        booking
    }
}