import { logout } from "../api/users";

export const Feed = () => {
    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}
