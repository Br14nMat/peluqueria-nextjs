"use client";

import { AuthService } from "@/services/auth.service";
import { register } from "module";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function usernamePage(){
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const router = useRouter();

    const onSubmit = () => {
        if (!email || !password)
            alert("Incorrect email or password")
        else{

            const authService = new AuthService(process.env.BACKEND_URL);
            const res = authService.register(name, email, password)
                .then(() => router.push('/login'))
                .catch((e) => alert("Error al registrarse" + e))
        }
    }
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
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

                <input 
                    type="text" 
                    placeholder="Nombre completo"
                    className="text-gray-700 w-full h-10 px-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                
                <input 
                    type="text"
                    placeholder="Email"
                    className="text-gray-700 w-full h-10 px-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                
                <input
                    placeholder="Contraseña"
                    type="password" 
                    className="text-gray-700 w-full h-10 px-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />

                <div className="w-full flex justify-center mt-4">
                    <button 
                        className="w-1/2 py-2 bg-black text-white rounded hover:bg- transition-all"
                        onClick={onSubmit}>
                        Register
                    </button>
                </div>
            </div>
        </div>

    )
}