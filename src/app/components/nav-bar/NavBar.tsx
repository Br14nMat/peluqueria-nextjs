"use client";

import { BellFillIcon, HomeIcon, SignOutIcon  } from "@primer/octicons-react";
import Link from "next/link";
import { ActiveLink } from "../active-link/ActiveLink";
import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/auth/useLogout";


const navItems = [
    {name:'Peluqueros', path: '/peluqueros'},
    {name:'Reservas', path: '/reservas'},
]

export const Navbar = () => {

    const router = useRouter();
    const {logout} = useLogout();

    const handleLogout = () => {
        router.push('/login')
        logout();
    }

    const handleBell = () => {
        router.push('/notificaciones')
    }

    return (
      <nav className="flex bg-azulOscuro bg-opacity-80 p-4">
        <Link href="/" className="p-2 m-2 text-white">
            <HomeIcon className="mr-2" />
            <span>Inicio</span>
        </Link>
        <div className="flex flex-1"></div>
        {
            navItems.map(item => (
                <ActiveLink  key={item.path} {...item}/>
            ))
        }

        <button
        onClick={handleBell}
        className="p-2 m-2 text-yellow-400 hover:text-yellow-500 transition"
        >
            <BellFillIcon className="mr-2" />
        </button>
        
        <button
        onClick={handleLogout}
        className="p-2 m-2 text-white hover:text-gray-300 transition"
        >
            <SignOutIcon className="mr-2" />
            <span>Salir</span>
        </button>

      </nav>
    );
}