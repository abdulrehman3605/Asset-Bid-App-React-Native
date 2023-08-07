import axios from 'axios';


const baseURL = 'https://api.zupa.ng'; //new prod link

let client = axios.create({
    baseURL
});

export default client;
