"use client";

import Image from "next/image";
import { NavbarH } from "@/app/components/nav-bar/NavBar";
import styles from "./hairdresserHome.module.css";
import { useRouter } from "next/navigation";

export default function HairdresserHome() {
  const router = useRouter();

  const handleReservar = () => {
    router.push("/servicios");
  };

  const handlePerfil = () => {
    router.push("/perfil-peluquero");
  };

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
          <div className={styles.buttonContainer}>
            <button onClick={handlePerfil} className={styles.profileButton}>Mi Perfil</button>
          </div>
        </div>
      </div>
    </div>
  );
}
