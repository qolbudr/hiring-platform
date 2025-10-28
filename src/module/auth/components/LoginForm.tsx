'use client';

import Image from "next/image";
import { Input } from "@/shared/components/Input";
import { Button } from "@/shared/components/Button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/module/auth/store/auth.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "../schema/login.schema";
import { toast, ToastContainer } from "react-toastify";

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
        if (store.status.isError) return toast(store.status.message);
        if (user?.role === 'admin') return router.replace('/dashboard/admin/joblist');
        router.replace('/dashboard/user/joblist');
        toast(store.status.message);
    }

    return (
        <div className="w-full max-w-[480px] text-left">
            <img src="/logo-auth.png" alt="logo-auth" className="mb-6 w-[145px]" />
            <div className="shadow-sm p-10">
                <form onSubmit={handleSubmit(login)}>
                    <h3 className="text-xl font-semibold">Masuk ke Rakamin</h3>
                    <p className="text-m mb-6">Belum punya akun? <a href="#" className="text-primary">Daftar menggunakan email</a></p>
                    <Input label="Alamat email" className="mb-4" placeholder="Email" {...register('email')} error={errors.email?.message} />
                    <Input label="Kata sandi" type="password" placeholder="Password" {...register('password')} error={errors.password?.message} />
                    <div className="text-right text-m w-full my-4">
                        <a href="#" className="text-primary text-right">Lupa kata sandi?</a>
                    </div>
                    <Button type="submit" variant="secondary" className="py-3!" fullWidth={true} size="large">{store.status.isLoading ? 'Loading...' : 'Masuk'}</Button>
                    <div className="my-4 text-s flex items-center">
                        <hr className="grow border-t border-neutral-60" />
                        <span className="mx-2 text-neutral-60">or</span>
                        <hr className="grow border-t border-neutral-60" />
                    </div>
                </form>
                <Button icon="mdi:email-outline" variant="outline" className="text-m py-3! font-bold mb-4" fullWidth={true} size="large">
                    Kirim link login melalui email
                </Button>
                <Button icon="mdi:google" variant="outline" className="text-m py-3! font-bold" fullWidth={true} size="large">
                    Masuk dengan Google
                </Button>
            </div>
            <ToastContainer position="top-center" />
        </div >
    );
}