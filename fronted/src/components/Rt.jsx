import { AiOutlineRetweet } from 'react-icons/ai'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { rt } from '../api/tweets'

export const Rt = ({ tweet, user }) => {

    const queryClient = useQueryClient()

    const rtMutation = useMutation({
        mutationFn: rt,
        onSuccess: () => {
            queryClient.invalidateQueries('tweets')
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const found = tweet.retweeted.some((key) => {
        if(key == user){
            return true
        } else {
            return false
        }
    })

    return (
        <AiOutlineRetweet size={20}
            onClick={() => rtMutation.mutate(tweet.id)}
            { ...tweet.iretweeted || found ? {color: 'green'} : {color: 'white'}}
        />
    )
}
