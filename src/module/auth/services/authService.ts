import { auth, db } from "@/shared/lib/firebase";
import apiClient from "@/shared/lib/api";
import { User } from "@/module/auth/types/user";
import { BaseResponse } from "@/shared/types/base_response";

const register = async (name: string, email: string, password: string, role: string): Promise<User> => {
    const response = await apiClient.post<BaseResponse<User>>('/auth/register', { name, email, password, role });
    const body = response.data;
    return body.data;
};

const login = async (email: string, password: string): Promise<User> => {
    const response = await apiClient.post<BaseResponse<User>>('/auth/login', { email, password });
    const body = response.data;
    return body.data;
};

const logOut = async (): Promise<void> => {
    // await signOut(auth);
};

export default { register, login, logOut };

