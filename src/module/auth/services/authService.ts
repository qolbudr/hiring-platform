import { auth, db } from "@/shared/lib/firebase";
import apiClient from "@/shared/lib/api";
import { User } from "@/module/auth/types/user";
import { BaseResponse } from "@/shared/types/base_response";
import { AxiosError } from "axios";

const register = async (name: string, email: string, password: string, role: string): Promise<User> => {
    const response = await apiClient.post<BaseResponse<User>>('/auth/register', { name, email, password, role });
    const body = response.data;
    return body.data;
};

const login = async (email: string, password: string): Promise<User> => {
    try {
        const response = await apiClient.post<BaseResponse<User>>('/auth/login', { email, password });
        const body = response.data;
        return body.data;
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) throw new Error(error.response?.data.error || 'Login failed');
        throw new Error('An unexpected error occurred');
    }
};

const logOut = async (): Promise<void> => {
    const response = await apiClient.get<BaseResponse<void>>('/auth/logout');
    const body = response.data;
    return body.data;
};

export default { register, login, logOut };

