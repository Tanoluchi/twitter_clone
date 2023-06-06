import { authAxios, axi } from './useAxios';
import jwt_decode from 'jwt-decode';

export const follow = async (username) => {
    await authAxios.post(`/users/follow/${username}/`);
};

export const recommendations = async () => {
    const res = await authAxios.get('/users/recommendations/');
    return res.data;
}

export const searchQuery = async(query) => {
    const res = await authAxios.get(`/users/search/?query=${query}/`);
    return res.data;
}

export const updateProfile = async (data) => {
    await authAxios.put(`/users/${localStorage.getItem('username')}/`, data);
}

export const userProfile = async (username) => {
    const res = await authAxios.get(`/users/${username}/`);
    return res.data;
}

export const logout = () => {
    localStorage.clear();
}

export const registerRequest = async (data) => {
    await axi.post('/users/register/', data);
}

export const loginRequest = async (data) => {
    const res = await axi.post('/users/login/', data);
    const { access, refresh } = res.data;

    // Save in localstorage
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);

    // Decode token
    const user = jwt_decode(localStorage.getItem('access'));

    localStorage.setItem('username', user.username);
    localStorage.setItem('user_id', user.user_id);
    localStorage.setItem('avatar', user.avatar);
}
