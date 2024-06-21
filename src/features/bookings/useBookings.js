import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings.js";

export function useBookings() {
    const [searchParams] = useSearchParams();

    // Filter
    const filterValue = searchParams.get('status');
    const filter = !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue }

    // Sort
    const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
    const [field, direction] = sortByRaw.split('-');
    const sortBy = { field, direction };

    // Pagination
    const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

    const { isLoading, data: { data: bookings, count } = {} , error } = useQuery({
        queryKey: ['bookings', filter, sortBy, page], // filter, sortBy - refreshes data when changed
        queryFn: () => getBookings({ filter, sortBy, page })
    });

    return {
        isLoading,
        bookings,
        count,
        error
    }
}