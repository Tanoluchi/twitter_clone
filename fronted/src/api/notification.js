import { authAxios } from "./useAxios";

export const mark = async () => {
    await authAxios.put("/notification/leer/");
}

export const getNoLeidas = async () => {
    const res = await authAxios.get("/notification/no/");
    return res.data;
}

export const getNoti = async () => {
    const res = await authAxios.get("/notification/");
    return res.data;
}