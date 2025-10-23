import { LoginForm } from "@/module/auth/components/LoginForm";
import type React from "react";

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