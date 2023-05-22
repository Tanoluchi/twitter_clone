import { axi } from './useAxios';
import jwt_decode from 'jwt-decode';

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
