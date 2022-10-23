import axios from 'axios';

const $api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = config => {
    config.headers.access = localStorage.getItem('token');
    return config;
};

$api.interceptors.request.use(authInterceptor);

export {
    $api,
}