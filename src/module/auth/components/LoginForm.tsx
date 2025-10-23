'use client';

import Image from "next/image";
import { Input } from "@/shared/components/Input";
import { Button } from "@/shared/components/Button";
import AuthService from "@/module/auth/services/authService";

export const LoginForm: React.FC = () => {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await AuthService.login('user@gmail.com', 'password');
        } catch (error: any) {
            alert(error.message);
        }
    }

    return (
        <div className="w-full max-w-[360px] md:max-w-[1024px] flex flex-row items-stretch">
            <img src="/login-illustration.jpeg" alt="login-illustration" className="hidden md:block w-1/2 object-cover rounded-l-lg" />
            <div className="w-full border border-[#e0e0e0] rounded-lg md:rounded-l-none w-full p-6 text-center flex flex-col items-center justify-center">
                <Image src="/logo.png" alt="logo" width={100} height={40} />
                <h2 className="text-lg lg:text-2xl font-semibold">Welcome Back</h2>
                <h3 className="text-md lg:text-lg">Please login into your account</h3>
                <form onSubmit={handleSubmit} className="space-y-4 mt-6 w-full max-w-[400px] px-4 md:px-10 mb-8">
                    <Input type="email" placeholder="Email" />
                    <Input className="mb-4" type="password" placeholder="Password" />
                    <Button type="submit">Login</Button>
                </form>
            </div>
        </div>
    );
}