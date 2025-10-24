'use client';

import Image from "next/image";
import { Input } from "@/shared/components/Input";
import { Button } from "@/shared/components/Button";
import AuthService from "@/module/auth/services/authService";
import { useAuth } from "@/module/auth/hooks/useAuth";
import { useRouter } from "next/navigation";

export const LoginForm: React.FC = () => {
    const { handleLogin, loading } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const email = (e.currentTarget as any).email.value;
            const password = (e.currentTarget as any).password.value;
            await handleLogin(email, password);
            router.replace("/dashboard");
        } catch (error) {
            console.error("Login failed", error);
        }
    }

    return (
        <div className="w-full max-w-[360px] md:max-w-5xl flex flex-row items-stretch">
            <img src="/login-illustration.jpeg" alt="login-illustration" className="hidden md:block w-1/2 object-cover rounded-l-lg" />
            <div className="w-full border border-neutral-40 rounded-lg md:rounded-l-none p-6 text-center flex flex-col items-center justify-center">
                <Image src="/logo.png" alt="logo" width={100} height={40} />
                <h2 className="text-lg lg:text-2xl font-semibold">Welcome Back</h2>
                <h3 className="text-md lg:text-lg">Please login into your account</h3>
                <form onSubmit={handleSubmit} className="space-y-4 mt-6 w-full max-w-[400px] px-4 md:px-10 mb-8">
                    <Input name="email" type="email" placeholder="Email" />
                    <Input className="mb-4" name="password" type="password" placeholder="Password" />
                    <Button fullWidth={true} size="large" type="submit">{loading ? 'Loading...' : 'Login'}</Button>
                </form>
            </div>
        </div>
    );
}