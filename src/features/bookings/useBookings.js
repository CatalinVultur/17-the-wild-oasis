import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings.js";

export function useBookings() {
    const [searchParams] = useSearchParams();

    // Filter
    const filterValue = searchParams.get('status');
    const filter = !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue }

    const { isLoading, data: bookings, error } = useQuery({
        queryKey: ['bookings', filter], // filter - refreshes data when changed
        queryFn: () => getBookings({ filter })
    });

    return {
        isLoading,
        bookings,
        error
    }
}
