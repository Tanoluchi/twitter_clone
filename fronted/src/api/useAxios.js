import axios from 'axios';
import jwt_decode from 'jwt-decode';

const baseURL = 'http://127.0.0.1:8000';

export const axi = axios.create({
    baseURL,
});

export const authAxios = axios.create({
    baseURL,
    withCredentials: true,
});

authAxios.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem('access');

    config.headers = {
        'Authorization': `Bearer ${accessToken}`,
    }

    const decoded = jwt_decode(accessToken);

    const expire = new Date(decoded.exp * 1000);
    const now = new Date();
    const five = 1000 * 60 * 5;

    if (expire.getTime() - now.getTime() < five) {
        try {
            const oldRefresh = localStorage.getItem('refresh');
            const res = await axi.post('/users/refresh/', { oldRefresh });
            const { access, refresh } = res.data;

            localStorage.setItem('access', access);
            localStorage.setItem('refresh', refresh);
        } catch(error) {
            localStorage.clear()
            window.location.href = '/login'
        }
    }

    return config
});