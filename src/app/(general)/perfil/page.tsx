"use client";

import Image from "next/image";
import { Navbar } from "@/app/components/nav-bar/NavBar";
import styles from "./perfil.module.css";
import { useRouter } from "next/navigation";

export default function PerfilPeluquero() {
  const router = useRouter();

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <div className={styles.profileImage}>
            <Image
              src="/profile-placeholder.jpg"
              alt="Foto de perfil"
              width={200}
              height={200}
              className={styles.avatar}
            />
          </div>
          <div className={styles.profileInfo}>
            <h1>Pepito perez</h1>
            <p>pepitoperez@icesi123</p>
            <button className={styles.editButton}>Editar</button>
          </div>
        </div>

        <div className={styles.profileContent}>
          <div className={styles.section}>
            <h2>Calificacion General</h2>
            {/* Aquí irá el componente de calificación */}
          </div>

          <div className={styles.section}>
            <h2>Grafica de Servicios</h2>
            {/* Aquí irá el componente de gráfica */}
          </div>

          <div className={styles.section}>
            <h2>Agenda</h2>
            {/* Aquí irá el componente de agenda */}
          </div>

          <div className={styles.section}>
            <h2>Reservas</h2>
            {/* Aquí irá el componente de reservas */}
          </div>

          <button 
            onClick={() => router.back()} 
            className={styles.backButton}
          >
            Atras
          </button>
        </div>
      </div>
    </div>
  );
} 