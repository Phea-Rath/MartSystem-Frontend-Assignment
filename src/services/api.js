import axios from 'axios';
const url = 'http://127.0.0.1:8000/api/'
const api = axios.create({
    baseURL: url,
    // timeout: 1000,
    // headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export default api;