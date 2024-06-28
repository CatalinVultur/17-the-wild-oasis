import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings.js";
import Spinner from "../../ui/Spinner.jsx";
import { useRecentStays } from "./useRecentStays.js";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

function DashboardLayout() {
    const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
    const { stays, confirmedStays, isLoading: isLoadingStays } = useRecentStays();

    if (isLoadingBookings || isLoadingStays) return <Spinner />;

    console.log(bookings, stays, confirmedStays);

    return (
        <StyledDashboardLayout>
            <div>Statistics</div>
            <div>Today`s activity</div>
            <div>Chart stay duration</div>
            <div>Chart sales</div>
        </StyledDashboardLayout>
    );
}

export default DashboardLayout;
