import axios from 'axios';
import { BACK_END_HOST } from './AppConfig';
import getTokenFromCookie from './Cookie.js'

const api = axios.create({
    baseURL: BACK_END_HOST,
});


// Thêm interceptor cho request
api.interceptors.request.use(
    (config) => {
        const token = getTokenFromCookie('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Thêm interceptor cho response
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            document.cookie = '';
            window.location.href = '/auth/sign-in';
        }
        return Promise.reject(error);
    }
);


export default api;
