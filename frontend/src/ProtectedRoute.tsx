import { Navigate } from "react-router-dom";
import { useAuth } from "./components/context/context";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const auth = useAuth();
    return (auth?.isLoggedIn && auth.user) ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;