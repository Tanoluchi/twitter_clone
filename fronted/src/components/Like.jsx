import { AiFillHeart } from 'react-icons/ai'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { like } from '../api/tweets'

export const Like = ({ tweet, user  }) => {
    const queryClient = useQueryClient()

    const likeMutation = useMutation({
        mutationFn: like,
        onSuccess: () => {
            queryClient.invalidateQueries('tweets')
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const found = tweet.liked.some((key) => {
        if(key == user){
            return true
        } else {
            return false
        }
    })


    return (
        <AiFillHeart 
        onClick={() => likeMutation.mutate(tweet.id)}
        { ...tweet.iliked || found ? {color: 'red'} : {color: 'white'} }
        size={20} />
    )
}