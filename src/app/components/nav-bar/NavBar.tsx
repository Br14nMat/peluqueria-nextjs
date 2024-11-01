import { HomeIcon } from "@primer/octicons-react";
import Link from "next/link";
import { ActiveLink } from "../active-link/ActiveLink";


const navItems = [
    {name:'Servicios', path: '/servicios'},
    {name:'Peluqueros', path: '/peluqueros'},
    {name:'Reservas', path: '/reservas'},
]
export const Navbar = () => {
    return (
      <nav className="flex bg-navbar bg-opacity-80 p-4">
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
        <button className="flex items-center justify-center p-3 rounded-lg bg-navbar_hover text-white font-bold hover:bg-gray-600 transition-all mx-4">
            Reservar
        </button>
      </nav>
    );
}