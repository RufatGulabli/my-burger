import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://gulabli-reactapp.firebaseio.com/'
});

export default instance;