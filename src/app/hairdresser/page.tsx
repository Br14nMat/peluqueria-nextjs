"use client";

import Image from "next/image";
import { Navbar } from "@/app/hairdresser/components/nav-bar/NavBar";
import styles from "./styles/hairdresserHome.module.css";
import { useRouter } from "next/navigation";

export default function HairdresserHome() {
  const router = useRouter();

  const handleReservar = () => {
    router.push("/servicios");
  };

  const handlePerfil = () => {
    router.push("/perfil");
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />
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
          
          
          
        </div>
      </div>
    </div>
  );
}
