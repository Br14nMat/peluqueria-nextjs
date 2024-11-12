"use client";

import Image from "next/image";
import styles from "../home.module.css";
import { useRouter } from "next/navigation";
import { Navbar } from "./components/NavBar";
import React, { useEffect } from 'react';
import { useAppDispatch } from "@/store";
import { fetchAllUsers } from "@/store/user/userSlice";


export default function Home() {

  const router = useRouter();

  const handlePeluqueros = () => {
    router.push("/admin/peluqueros")
  }

  const handleClientes = () => {
    router.push("/admin/clientes")
  }

  return (
    <div className={styles.pageContainer}>
      
      <div className={styles.backgroundContainer}>
        <Image
          src="/home.jpg" 
          alt="Background"
          layout="fill"
          objectFit="cover"
        />
        <div className={styles.overlay}></div> 

        <div className={styles.textContainer}>
          <h1 className={styles.title}>Hair Vibe</h1>
          <button onClick={handlePeluqueros} className="bg-rosado hover:bg-rosadoOscuro justify-center p-3 rounded-lg text-white transition-all mx-4">Peluqueros</button>
          <button onClick={handleClientes} className="bg-rosado hover:bg-rosadoOscuro justify-center p-3 rounded-lg text-white transition-all mx-4">Clientes</button>
        </div>
      </div>
    </div>
  );
}
