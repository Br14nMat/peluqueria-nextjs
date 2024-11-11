"use client";

import Image from "next/image";
import { Navbar } from "@/app/hairdresser/components/nav-bar/NavBar";
import styles from "./styles/perfil.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Definimos la interfaz para el tipo de datos del peluquero
interface Peluquero {
  nombre: string;
  email: string;
  foto_perfil: string;
  calificacion: number;
  servicios: {
    nombre: string;
    cantidad: number;
  }[];
  // Añade más campos según necesites
}

export default function PerfilPeluquero() {
  const router = useRouter();
  const [peluquero, setPeluquero] = useState<Peluquero | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPeluqueroData = async () => {
      try {
        const response = await fetch('/api/peluquero/perfil', {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('No se pudo obtener los datos del peluquero');
        }

        const data = await response.json();
        setPeluquero(data);
      } catch (err) {
        setError("Error al cargar los datos del peluquero");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPeluqueroData();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!peluquero) {
    return <div>No se encontraron datos del peluquero</div>;
  }

  return (
    <div className={styles.pageContainer}>
      
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <div className={styles.profileImage}>
            <Image
              src={peluquero.foto_perfil || "/profile-placeholder.jpg"}
              alt="Foto de perfil"
              width={200}
              height={200}
              className={styles.avatar}
            />
          </div>
          <div className={styles.profileInfo}>
            <h1>{peluquero.nombre}</h1>
            <p>{peluquero.email}</p>
            <button className={styles.editButton}>Editar</button>
          </div>
        </div>

        <div className={styles.profileContent}>
          <div className={styles.section}>
            <h2>Calificación General</h2>
            <p>{peluquero.calificacion} / 5</p>
          </div>

          <div className={styles.section}>
            <h2>Gráfica de Servicios</h2>
            {peluquero.servicios && (
              <ul>
                {peluquero.servicios.map((servicio, index) => (
                  <li key={index}>
                    {servicio.nombre}: {servicio.cantidad}
                  </li>
                ))}
              </ul>
            )}
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
            Atrás
          </button>
        </div>
      </div>
    </div>
  );
} 