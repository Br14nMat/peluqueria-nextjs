"use client";

import { HomeIcon, SignOutIcon  } from "@primer/octicons-react";
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
        logout();
        router.push('/login')
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
        
        <Link href={""} onClick={handleLogout} className="p-2 m-2 text-white">
            <SignOutIcon  className="mr-2" />
            <span>Salir</span>
        </Link>

      </nav>
    );
}