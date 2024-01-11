import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import Loading from "./loading";
import { AuthContext } from "@/contexts/AuthContext";

const ProtectedRoute = ({
    children,
    ...passProps
}: {
    children: ReactNode;
}) => {
    const { user } = useContext(AuthContext);

    return user ? <>{children}</> : <Navigate {...passProps} to={"/"} />;
};
export default ProtectedRoute;
