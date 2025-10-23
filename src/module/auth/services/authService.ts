import { auth, db } from "@/shared/lib/firebase";
import apiClient from "@/shared/lib/api";
import { User } from "@/module/auth/types";

const register = async (name: string, email: string, password: string, role: string): Promise<User> => {
    const response = await apiClient.post<User>('/auth/register', { name, email, password, role });
    return response.data;
};

const login = async (email: string, password: string): Promise<User> => {
    const response = await apiClient.post<User>('/auth/login', { email, password });
    return response.data;
};

const logOut = async (): Promise<void> => {
    // await signOut(auth);
};

export default { register, login, logOut };

