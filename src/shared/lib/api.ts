import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { User } from "@/module/auth/types/user";

class ApiClient {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
        });
        this.axiosInstance.interceptors.request.use(this.addAuthToken);
    }

    private addAuthToken = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const storage = localStorage.getItem('auth-storage');
        const user : User = storage ? JSON.parse(storage).state.user : null;

        if (user) {
            config.headers['Authorization'] = `Bearer ${user.token}`;
        }
        return config;
    };

    public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.get<T>(url, config);
    }

    public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.post<T>(url, data, config);
    }

    public put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.put<T>(url, data, config);
    }

    public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.delete<T>(url, config);
    }
}

const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api');

export default apiClient;