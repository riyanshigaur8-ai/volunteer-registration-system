import axios from "axios";

const API = axios.create({
    baseURL: "https://volunteerhub-backend-90fr.onrender.com"
});

export default API;