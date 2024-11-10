"use client";

import { HomeIcon, SignOutIcon  } from "@primer/octicons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/auth/useLogout";
import { ActiveLink } from "@/app/components/active-link/ActiveLink";


const navItems = [
    {name:'Servicios', path: 'admin/servicios'},
    {name:'Peluqueros', path: 'admin/peluqueros'},
    {name:'Clientes', path: 'admin/clientes'},
]

export const Navbar = () => {

    const router = useRouter();
    const {logout} = useLogout();

    const handleLogout = () => {
        router.push('/login')
        logout();
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