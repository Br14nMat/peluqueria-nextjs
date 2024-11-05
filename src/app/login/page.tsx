"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLogin } from "@/hooks/auth/useLogin";
import styles from "./styles/usernamePage.module.css";

export default function UsernamePage() {
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { login } = useLogin();

    const onSubmit = () => {
        if (!username || !password)
            alert("Please enter username")
        else {
            let res = login(username, password)
                .then(() => router.push("/"))
                .catch((e: Error) => {
                    console.error(e);
                    setUsername("");
                    setPassword("");                    
                    alert("Invalid Credentials");
                });
        }
    };
    
    return (
        <div className={`${styles.background} flex items-center justify-center min-h-screen`}>
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg items-center">
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={120} 
                    height={20}
                    priority
                    className="mx-auto"
                />
                <h1 className="text-2xl font-bold text-center mb-6 text-black">Hair Vibe</h1>
                <label className="block mb-2 text-gray-700">Email</label>
                <input 
                    type="text" 
                    className="text-gray-700 w-full h-10 px-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <label className="block mb-2 text-gray-700">Password</label>
                <input 
                    type="password" 
                    className="text-gray-700 w-full h-10 px-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <div className="w-full flex justify-center mt-4">
                    <button 
                        className="w-1/2 py-2 bg-black text-white rounded hover:bg- transition-all"
                        onClick={onSubmit}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}
