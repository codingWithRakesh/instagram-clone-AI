import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({children}) => {
    const {user} = useSelector(store=>store.auth);
    if(!user){
        return <Navigate to="/accounts/login" replace />
    }

    return children
}

const AuthenticatedUserRoute = ({children}) => {
    const {user} = useSelector(store=>store.auth);
    if(user){
        return <Navigate to="/" replace />;
    }

    return children
}

export {
    ProtectRoute,
    AuthenticatedUserRoute
}