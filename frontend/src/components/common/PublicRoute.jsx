import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

function PublicRoute({ children }) {
    const { isAuthenticated, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <p>Verifying authentication...</p>;
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default PublicRoute;