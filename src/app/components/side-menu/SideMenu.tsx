"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  return (
    <div className="relative">
 
      <button 
        className="p-2 bg-gray-700 text-white rounded-md" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Icono menu */}
      </button>

 
      <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-48 p-4 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <h2 className="text-lg font-bold mb-4">Menu</h2>
        <nav className="space-y-2">
          <Link href="/" className="block hover:bg-gray-700 px-3 py-2 rounded">
            Inicio
          </Link>
          <Link href="/cliente" className="block hover:bg-gray-700 px-3 py-2 rounded">
            Clientes
          </Link>
          <Link href="/peluqueros" className="block hover:bg-gray-700 px-3 py-2 rounded">
            Peluqueros
          </Link>
          <Link href="/servicios" className="block hover:bg-gray-700 px-3 py-2 rounded">
            Servicios
          </Link>
        </nav>

        {/* Icono cerrar sesion */}
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 hover:bg-red-600 px-3 py-2 rounded flex items-center w-full justify-center mt-6"
        >
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
}
