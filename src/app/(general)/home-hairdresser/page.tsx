"use client";

import Image from "next/image";
import { Navbar } from "@/app/components/nav-bar/NavBar";
import styles from "./home-hairdresser.module.css";
import { useRouter } from "next/navigation";

export default function HomeHairdresser() {
  const router = useRouter();

  const handleVerPerfil = () => {
    router.push("/peluqueros");
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      
      <div className={styles.backgroundContainer}>
        <Image
          src="/home-hairdresser.jpg" 
          alt="Background"
          layout="fill"
          objectFit="cover"
        />
        <div className={styles.overlay}></div> 

        <div className={styles.textContainer}>
          <h1 className={styles.title}>Bienvenido Peluquero</h1>
          <button onClick={handleVerPerfil} className={styles.profileButton}>
            Ver mi perfil
          </button>
        </div>
      </div>
    </div>
  );
} 