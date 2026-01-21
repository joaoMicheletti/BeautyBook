import axios from 'axios';

const api = axios.create({
    baseURL: //'http://192.168.0.224:1998',
        'https://beautybookts-production.up.railway.app/',
    timeout: 10000,
    headers: {'Content-Type': 'application/json; charset=utf-8'}
});
export default api;