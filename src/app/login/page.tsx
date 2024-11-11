"use client";

import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/auth/useLogin";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchAllUsers } from "@/store/user/userSlice";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import React, { useEffect, useState } from "react";
import { useLogout } from "@/hooks/auth/useLogout";


export default function usernamePage(){
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState("");

    const dispatch = useAppDispatch();
    const router = useRouter();
    const { login } = useLogin();
    const { logout } = useLogout();
    const { user:currentUser } = useCurrentUser();


    useEffect(() => {
        logout();
    }, []);

    const onSubmit = () => {
        if (!username || !password)
            alert("Please enter username")
        else{
            let res = login(username, password)
                .then(() => {
                    router.push("/")
                }
                )
                .catch( (e: Error) => {
                    console.error(e)
                    setUsername("");
                    setPassword("");                    
                    alert("Login error")})

        }
    }
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg items-center">
                
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

                <div className="w-full flex justify-center mt-4">
                    <Link className="text-black text-sm"  href="/register">Registrarse</Link>
                </div>
        
            </div>
        </div>

    )
}