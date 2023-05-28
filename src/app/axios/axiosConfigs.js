import axios from "axios"
import { toast } from "react-toastify"

export const api = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1`,
})

// defining a custom error handler for all APIs
const errorHandler = (error) => {
    const statusCode = error.response?.status

    if (error.code === "ERR_CANCELED") {
        toast.error("API canceled!");
        return Promise.resolve()
    }

    // logging only errors that are not 401
    if (statusCode && statusCode !== 401) {
        console.error(error)
    }

    return Promise.reject(error)
}

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error) => {
    return errorHandler(error)
})

// Add a request interceptor
api.interceptors.request.use(function (config) {
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json";

    const token = localStorage.getItem("token") || null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});