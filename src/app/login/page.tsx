"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLogin } from "@/hooks/auth/useLogin";

export default function usernamePage(){
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { login } = useLogin();

    const onSubmit = () => {
        if (!username || !password)
            alert("Please enter username")
        else{
            login(username, password)
                .then(()=>router.push("/profile"))
                .catch( (e: Error) => {
                    console.error(e)
                    setUsername("");
                    setPassword("");                    
                    alert("Invalid Credentials")})
        }
    }
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
                
                
                <Image
                    src="/logo.svg"
                    alt="House Mafia Logo"
                    width={120} 
                    height={20}
                    priority
                    className="mx-auto"
                />
                
                <h1 className="text-2xl font-bold text-center mb-6 text-black">House Mafia</h1>

                <label className="block mb-2 text-gray-700">Username</label>
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

                <button 
                    className="w-full py-2 bg-black text-white rounded hover:bg-blue-500 transition-all"
                    onClick={onSubmit}
                >
                    Login
                </button>
            </div>
        </div>

    )
}