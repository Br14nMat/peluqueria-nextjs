import { HomeIcon } from "@primer/octicons-react";
import Link from "next/link";
import { ActiveLink } from "../active-link/ActiveLink";

const navItems = [
    {name:'Peluqueros', path: '/peluqueros'},
    {name:'Reservas', path: '/reservas'},
]

export const Navbar = () => {
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
        <a href="/servicios" className="bg-azulClaro flex items-center justify-center p-3 rounded-lg text-white font-bold hover:bg-azulPastel hover:text-azulOscuro transition-all mx-4">
            Reservar
        </a>
      </nav>
    );
}