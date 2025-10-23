import { LoginForm } from "@/module/auth/components/loginForm";
import type React from "react";

export const metadata = {
  title: "Hiring Platform | Login",
  description: "Sign in to access your dashboard",
};

const Login = (): React.JSX.Element => {
    return (
        <div>
            <main className="flex h-screen w-screen flex-col items-center justify-center p-4">
                <LoginForm />
            </main>
        </div>
    );
}

export default Login;