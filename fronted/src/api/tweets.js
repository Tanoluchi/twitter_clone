import { authAxios } from './useAxios';

export const addTweet = async (data) => {
    await authAxios.post('/tweets/', data);
}

export const getTweets = async ({pageParam = 1}) => {
    const response = await authAxios.get(`/tweets/?page=${pageParam}&pages=10`);
    return response.data;
};