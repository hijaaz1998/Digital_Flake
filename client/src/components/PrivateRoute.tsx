import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/rootReducer"; // Adjust the import based on your file structure
import { selectUser } from "../slices/userSlice";

export const PrivateRoutes = () => {
    const user = useSelector((state: RootState) => selectUser(state));

    return user ? (
        <Outlet />
    ) : (
        <Navigate to="/" />
    );
};
