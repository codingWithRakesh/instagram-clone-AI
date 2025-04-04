import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";

const ProtectRoute = ({children}) => {
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    if(!user && !isAuthenticated){
        return <Navigate to="/accounts/login" replace />
    }

    return children
}

const AuthenticatedUserRoute = ({children}) => {
    const {user} = useSelector(store=>store.auth);
    if(user && isAuthenticated){
        return <Navigate to="/" replace />;
    }

    return children
}

export {
    ProtectRoute,
    AuthenticatedUserRoute
}