import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5454'
});

instance.interceptors.request.use(function (config) {
    // Do something before the request is sent
    return config;
}, function (error) {
    // Do something with the request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lies within the range of 2xx causes this function to trigger
    // Do something with response data
    if (response.data && response.data.data) return response.data;
    return response;
}, function (error) {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response && error.response.data) return error.response.data;
    return Promise.reject(error);
});

instance.interceptors.request.use((config) => {
    // Lấy token đúng cái tên đã lưu ở AuthContext
    const token = localStorage.getItem('jwt');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export default instance