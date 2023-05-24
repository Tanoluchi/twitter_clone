import { Outlet, Navigate } from "react-router-dom";


export const PrivateRoute = () => {
    const user = localStorage.getItem('user_id')

    return (
        user ? <Outlet/> : <Navigate to="/login" replace={true} />
    )
}
