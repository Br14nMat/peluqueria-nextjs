"use client";

import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { AuthService } from "@/services/auth.service";
import { registerByAdmin } from "@/services/user.service";
import { register } from "module";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterAdmin(){

    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");   
    const { user:currentUser } = useCurrentUser();


    const router = useRouter();

    const onSubmit = () => {
        if (!email || !password)
            alert("Incorrect email or password")
        else{
            const res = registerByAdmin(name, email, password, [role], currentUser?.token)
                .then(() =>{
                    alert(role + " creado exitosamente!")
                    router.push('/')
                })
                .catch((e) => alert("Error al registrar usuario" + e))
        }
    }
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg items-center">
                
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

                <div className="mb-4">
                    <label htmlFor="role" className="text-gray-700 block mb-2">
                        Tipo de usuario:
                    </label>
                    <div className="flex items-center space-x-4">
                        <input
                        type="radio"
                        id="admin"
                        name="role"
                        value="admin"
                        checked={role === "admin"} // Set checked state based on role
                        onChange={(e) => setRole(e.target.value)}
                        className="w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <label htmlFor="admin" className="text-gray-700">
                        Administrador
                        </label>
                        <input
                        type="radio"
                        id="hairdresser"
                        name="role"
                        value="hairdresser"
                        checked={role === "hairdresser"} 
                        onChange={(e) => setRole(e.target.value)}
                        className="w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <label htmlFor="hairdresser" className="text-gray-700">
                        Peluquero
                        </label>
                    </div>
                </div>

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