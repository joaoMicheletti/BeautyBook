import axios from 'axios';

const api = axios.create({
    baseURL: 'https://7212-177-68-5-212.ngrok-free.app',
    timeout: 10000,
    headers: {'Content-Type': 'application/json; charset=utf-8'}
});
export default api;