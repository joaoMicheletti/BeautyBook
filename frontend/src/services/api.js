import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.17.3.187:1998',
    timeout: 10000,
    headers: {'Content-Type': 'application/json; charset=utf-8'}
});
export default api;