"use client";

import Image from "next/image";
import { Navbar } from "./components/nav-bar/NavBar";
import styles from "./home.module.css";
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter();

  const handleReservar = () => {
    router.push("/servicios")
  }

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
          <button onClick={handleReservar} className={styles.reserveButton}>Reservar</button>
        </div>
      </div>
    </div>
  );
}
