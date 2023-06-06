import { getTweets } from "../api/tweets";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Loader, AddTweet, Like, Rt } from "../components";
import { toast } from "react-hot-toast";
import { AiOutlineMessage } from 'react-icons/ai';

export const Feed = () => {
    const {ref, inView } = useInView();
    
    const { data, isLoading, isError, error, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
        ["tweets"],
        getTweets,
        {
            getNextPageParam: (lastPage) => lastPage.meta.next,
        }
    )

    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView])

    if (isLoading) return <Loader />
    if (isError) return toast.error(error.message)

    return (
        <>
            <div className="border-b-[1px] border-neutral-800 p-5">
                <div className="flex flex-row items-start gap-3">
                    <div>
                        <div className="flex flex-row items-center gap-2">
                            <p className="text-white font-semibold text-xl">
                                Home
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <AddTweet/>

            {data.pages.map(page => (
                <div key={page.meta.page}>
                    {page.data.map(tweet => (
                        <>
                            <div key={tweet.id} className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
                                <div className="flex flex-row items-start gap-3">
                                    <img className="h-11 w-11 rounded-full" src={`http://127.0.0.1:8000${tweet.avatar}`} />
                                        <div>
                                            <div className="flex flex-row items-center gap-2">
                                                <p className="text-white font-semibold cursor-pointer hover:underline">
                                                    <Link to={`${tweet.user}`}>
                                                        {tweet.user}
                                                    </Link>
                                                </p>

                                                <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                                                    @{tweet.user}
                                                </span>

                                                <span className="text-neutral-500 text-sm">
                                                    {new Date(tweet.created_at).toDateString().slice(4)}
                                                </span>
                                            </div>

                                        <Link to={`tweet/${tweet.id}`}>
                                            <div className="text-white mt-1 text-start">
                                                {tweet.content}
                                            </div>
                                        </Link>

                                        <img src={tweet.image} />
                                        <div className="flex flex-row items-center mt-3 gap-10">
                                            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
                                                <Link to={`tweet/${tweet.id}`}>
                                                    <AiOutlineMessage size={20} />
                                                </Link>

                                                <p>
                                                    {tweet.parent.length}
                                                </p>
                                            </div>

                                            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-green-500">
                                                <Rt tweet={tweet}/>
                                                <p>
                                                    {tweet.retweets_count}
                                                </p>
                                            </div>


                                        <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
                                            <Like tweet={tweet}/>
                                            <p>
                                                {tweet.likes_count}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {!isLoading && data.pages.length === 0 && <p>No results</p>}
                        {!isLoading && data.pages.length  > 0 && hasNextPage && (
                        <div ref={ref} >
                            {isLoading || isFetchingNextPage ? <Loader/> : null}
                        </div>
                        )}
                        </>
                    ))}
                </div>
            ))}
        </>
    )
}
