import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser.js";
import styled from "styled-components";

import Spinner from "./Spinner.jsx";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading, isFetching } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated && !isLoading && !isFetching) navigate('/login');
    }, [isAuthenticated, isLoading, navigate, isFetching]);

    if (isLoading) return <FullPage>
        <Spinner />
    </FullPage>

    if (isAuthenticated) return children;
}

export default ProtectedRoute;
