import axios from 'axios';

const backend = axios.create({
    baseURL: `http://localhost:3007/api`
});

export default backend;
