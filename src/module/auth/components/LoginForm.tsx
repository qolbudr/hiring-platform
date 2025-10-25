'use client';

import Image from "next/image";
import { Input } from "@/shared/components/Input";
import { Button } from "@/shared/components/Button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/module/auth/store/auth.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "../schema/login.schema";

export const LoginForm: React.FC = () => {
    const store = useAuthStore();
    const router = useRouter();

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        reValidateMode: "onBlur",
    });

    const login = async (data: LoginFormValues) => {
        const user = await store.login(data);
        if(user?.role === 'admin') return router.replace('/dashboard/admin/joblist');
        router.replace('/dashboard/user/joblist');
      }

    return (
        <div className="w-full max-w-[360px] md:max-w-5xl flex flex-row items-stretch">
            <img src="/login-illustration.jpeg" alt="login-illustration" className="hidden md:block w-1/2 object-cover rounded-l-lg" />
            <div className="w-full border border-neutral-40 rounded-lg md:rounded-l-none p-6 text-center flex flex-col items-center justify-center">
                <Image src="/logo.png" alt="logo" width={100} height={40} />
                <h2 className="text-lg lg:text-2xl font-semibold">Welcome Back</h2>
                <h3 className="text-md lg:text-lg">Please login into your account</h3>
                <form onSubmit={handleSubmit(login)} className="space-y-4 mt-6 w-full max-w-[400px] px-4 md:px-10 mb-8">
                    <Input placeholder="Email" {...register('email')} error={errors.email?.message} />
                    <Input className="mb-4" type="password" placeholder="Password" {...register('password')} error={errors.password?.message} />
                    <Button fullWidth={true} size="large" type="submit">{store.status.isLoading ? 'Loading...' : 'Login'}</Button>
                </form>
            </div>
        </div>
    );
}