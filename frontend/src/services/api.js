import axios from 'axios';

const api = axios.create({
    baseURL: 'https://useful-incredibly-goldfish.ngrok-free.app',
    timeout: 10000,
    headers: {'Content-Type': 'application/json; charset=utf-8'}
});
export default api;