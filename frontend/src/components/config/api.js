import axios from "axios"

export const API_URL="http://localhost:5454/"

export const api=axios.create({
    baseURL:API_URL,
    headers:{
        "Content-Type":"application/json",
    }
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwt"); // Kiểm tra key này có đúng với lúc bạn lưu khi Login không
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

