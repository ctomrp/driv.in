import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'X-Api-Key': API_KEY
    }
})