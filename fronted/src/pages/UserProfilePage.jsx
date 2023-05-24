import { useParams } from "react-router-dom"
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { userProfile } from "../api/users"
import Loader from "../components/Loader"

export const UserProfilePage = () => {
    const { username } = useParams()

    const {data: user, isLoading: loadingUser, isError: isErrorUser, error: errorUser } = useQuery({
        queryKey: ['user', username],
        queryFn: () => userProfile(username)
    })

    if (loadingUser) return <Loader/>
    if (isErrorUser) return <div>Error: {errorUser.message}</div>

    return (
        <div>{user.username}</div>
    )
}
