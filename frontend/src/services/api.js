import axios from 'axios';

const api = axios.create({
    baseURL: 'https://a7c0-2804-23d4-833f-0-3ddd-b824-81f7-ed3f.ngrok-free.app',
    timeout: 10000,
    headers: {'Content-Type': 'application/json; charset=utf-8'}
});
export default api;