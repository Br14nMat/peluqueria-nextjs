// src/app/page.tsx
import Image from "next/image";
import { Navbar } from "./components/nav-bar/NavBar";
import SideMenu from "./components/side-menu/SideMenu";

export default function Home() {
  return (
    <div className="flex">
      {/* Renderiza el menú lateral */}
      <SideMenu />

      {/* Contenedor principal que incluye la barra de navegación */}
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h1>Bienvenido a la página de inicio</h1>
        </main>
      </div>
    </div>
  );
}
