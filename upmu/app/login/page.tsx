"use client";
import { useState } from "react";
import { signIn } from "@/lib/supabase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter ();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await signIn(email, password);
        if (error) setError(error.message);
        else router.push("/");
    };

    return (
        <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-20 space-y-4">
            <h2 className="text-xl font-bold">로그인</h2>
            <input
                className="w-full border p-2 rounded"
                type="email"
                placeholder="이메일"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <input
                className="w-full border p-2 rounded"
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            {error && <div className="text-red-500">{error}</div>}
            <button className="w-full bg-blue-600 text-white py-2 rounded"
            type="submit">로그인</button>
        </form>
    )
}