"use client"
import { Button, Label, TextInput } from "flowbite-react";
import { JSX, useState , useEffect } from "react";
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";

const LoginForm = (): JSX.Element => {

    const router: AppRouterInstance = useRouter();
    const searchParams: ReadonlyURLSearchParams | null = useSearchParams();
    const redirectTo = searchParams?.get('redirect');
    const message = searchParams?.get('message');
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // SHow message
    useEffect(() => {
        if (message) {
            toast.info(message);
        }
    }, [message]);

    const handleSubmit = async (e: React.FormEvent) => {
        
        e.preventDefault();

        setLoading(true);
        
        if (username === "" || password === "") {
            toast.warn("Username and password can't be blank")
            return
        }

        const requestBody: object = {
            username: username,
            password: password
        }

        try {

            const res = await fetch('/api/service/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(requestBody),
            });

            const data = await res.json();

            if (res.ok) {
                setLoading(false);
                const destination = redirectTo || "/category"
                router.push(destination);
            } else {
                setLoading(false);
                toast.error(data.responseMessage || "Login failed");
                return
            }

        } catch (error: any) {
            toast.error("Network error");
        }

    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white rounded shadow-md">
                    <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">Login</h1>

                    <div className="mb-4">
                        <Label htmlFor="username" />
                        <TextInput
                            id="username"
                            type="text"
                            placeholder="You registered username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="password" />
                        <TextInput
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button type="submit" className="w-full">{loading ? 'Logging in...' : 'Login'}</Button>
                </form>
            </div>
        </>
    )
}

export default LoginForm;