"use client";

import Image from "next/image";
import styles from "../home.module.css";
import { useRouter } from "next/navigation";
import { Navbar } from "./components/NavBar";


export default function Home() {

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
        </div>
      </div>
    </div>
  );
}
