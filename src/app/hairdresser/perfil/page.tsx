"use client";

import Image from "next/image";
import { Navbar } from "@/app/hairdresser/components/nav-bar/NavBar";
import styles from "./styles/perfil.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useAppSelector, useAppDispatch } from '@/store';
import { fetchFeedbackByHairdresser } from '@/store/feedback/feedbackSlice';

// Definimos la interfaz para el tipo de datos del peluquero
interface Peluquero {
  id: string;
  nombre: string;
  email: string;
  foto_perfil: string;
  calificacion: number[];
  servicios: {
    nombre: string;
    cantidad: number;
  }[];
  reservations?: Array<{
    id: string;
    start: Date;
    end: Date;
    title: string;
  }>;
  // Añade más campos según necesites
}

export default function PerfilPeluquero() {
  const router = useRouter();
  const [peluquero, setPeluquero] = useState<Peluquero | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mostrarCalificacion, setMostrarCalificacion] = useState(false);
  const [mostrarAgenda, setMostrarAgenda] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const dispatch = useAppDispatch();
  const feedbacks = useAppSelector((state) => state.feedbacks.list);

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

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('/api/hairdresser/reservations', {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setReservations(data);
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    if (peluquero) {
      dispatch(fetchFeedbackByHairdresser({ 
        hairdresserId: peluquero.id, 
        token: 'tu-token-aqui' 
      }));
    }
  }, [peluquero, dispatch]);

  const calcularPromedioCalificacion = (calificaciones: number[]): number => {
    if (!calificaciones || calificaciones.length === 0) return 0;
    const suma = calificaciones.reduce((acc, curr) => acc + curr, 0);
    return Number((suma / calificaciones.length).toFixed(1));
  };

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
      <Navbar />
      
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
          <ul className={styles.menuLateral}>
            <li>
              <button 
                onClick={() => setMostrarCalificacion(!mostrarCalificacion)}
                className={styles.menuButton}
              >
                Calificación General
              </button>
            </li>
            
            <li>
              <button 
                onClick={() => setMostrarAgenda(!mostrarAgenda)}
                className={styles.menuButton}
              >
                Agenda
              </button>
            </li>
            
            <li>
              <button 
                onClick={() => router.push('/hairdresser/reservas')}
                className={styles.menuButton}
              >
                Reservas
              </button>
            </li>
            
            <li>
              <button 
                onClick={() => setMostrarFeedback(!mostrarFeedback)}
                className={styles.menuButton}
              >
                Feedback
              </button>
            </li>
            
            <li>
              <button 
                onClick={() => router.back()} 
                className={`${styles.menuButton} ${styles.backButton}`}
              >
                Atrás
              </button>
            </li>
          </ul>

          {mostrarCalificacion && (
            <div className={styles.calificacionDisplay}>
              <span className={styles.calificacionNumero}>
                {calcularPromedioCalificacion(peluquero.calificacion)}
              </span>
              <span className={styles.estrella}>★</span>
            </div>
          )}

          {mostrarAgenda && (
            <div className={styles.calendarContainer}>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                selectable={false}
                slotMinTime="07:00:00"
                slotMaxTime="18:00:00"
                contentHeight={650}
                events={reservations}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
              />
            </div>
          )}

          {mostrarFeedback && (
            <div className={styles.feedbackContainer}>
              <h2 className={styles.feedbackTitle}>Reseñas de Clientes</h2>
              <div className={styles.feedbackList}>
                {feedbacks.map((feedback, index) => (
                  <div key={index} className={styles.feedbackItem}>
                    <div className={styles.feedbackRating}>
                      {feedback.rating} <span className={styles.estrella}>★</span>
                    </div>
                    <p className={styles.feedbackClientName}>
                      {feedback.client.name}:
                    </p>
                    <p className={styles.feedbackComment}>
                      {feedback.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}