"use client";

import Image from "next/image";
import styles from "../home.module.css";
import { useRouter } from "next/navigation";
import React, { useEffect } from 'react';
import { useAppDispatch } from "@/store";
import { fetchAllUsers } from "@/store/user/userSlice";


export default function Home() {

  const router = useRouter();

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