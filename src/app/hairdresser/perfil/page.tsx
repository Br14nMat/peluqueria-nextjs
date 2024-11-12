'use client'

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
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';
import { fetchAllUsers, setSelectedHairdresser } from '@/store/user/userSlice';
import { getHairdresserReservations } from "@/services/reservation.service";
import { format } from 'date-fns';

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

export default function PerfilPeluquero() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user: currentUser } = useCurrentUser();
  const hairdresser = useAppSelector((state) => state.users.selectedHairdresser);
  const feedbacks = useAppSelector((state) => state.feedbacks.list);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mostrarCalificacion, setMostrarCalificacion] = useState(false);
  const [mostrarAgenda, setMostrarAgenda] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const loadHairdresserProfile = async () => {
      try {
        if (!currentUser?.token) return;
        await dispatch(fetchAllUsers());
        const users = await dispatch(fetchAllUsers()).unwrap();
        const currentHairdresser = users.find(user => user.id === currentUser?.user_id);
        if (currentHairdresser) {
          dispatch(setSelectedHairdresser(currentHairdresser));
        }
        setLoading(false);
      } catch (error) {
        setError("Error al cargar los datos del peluquero");
        console.error(error);
        setLoading(false);
      }
    };

    loadHairdresserProfile();
  }, [currentUser, dispatch]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        if (!currentUser?.token || !hairdresser?.id) return;
        const response = await fetch(`/api/hairdresser/${hairdresser.id}/reservations`, {
          headers: {
            'Authorization': `Bearer ${currentUser.token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setReservations(data);
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    if (hairdresser) {
      fetchReservations();
    }
  }, [currentUser, hairdresser]);

  useEffect(() => {
    async function loadComentarios() {
      try {
        if (!currentUser?.token || !hairdresser?.id) return;
        dispatch(fetchFeedbackByHairdresser({ 
          hairdresserId: hairdresser.id, 
          token: currentUser.token 
        }));
      } catch (error) {
        console.error("Error al obtener los comentarios", error);
      }
    }

    if (hairdresser && currentUser?.token) {
      loadComentarios();
    }
  }, [currentUser, hairdresser, dispatch]);

  useEffect(() => {
    async function loadReservations() {
      try {
        if (!currentUser?.token || !currentUser?.user_id || !mostrarAgenda) return;
        
        const data = await getHairdresserReservations(currentUser.user_id, currentUser.token);
        const events = data.map(reservation => ({
          id: reservation.id,
          title: `${reservation.service.name} - ${reservation.client.name}`,
          start: new Date(reservation.reservationDate),
          end: new Date(new Date(reservation.reservationDate).getTime() + (reservation.service.duration * 60000))
        }));
        setCalendarEvents(events);
      } catch (error) {
        console.error("Error al obtener las reservas", error);
      }
    }

    if (mostrarAgenda) {
      loadReservations();
    }
  }, [currentUser, mostrarAgenda]);

  const calcularPromedioCalificacion = () => {
    if (feedbacks.length === 0) return 0;
    const total = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
    return parseFloat((total / feedbacks.length).toFixed(1));
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!hairdresser) return <div>No se encontraron datos del peluquero</div>;

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <div className={styles.profileImage}>
      
          </div>
          <div className={styles.profileInfo}>
            <h1>{hairdresser.name}</h1>
            <p>{hairdresser.email}</p>
           
          </div>
        </div>

        <div className={styles.profileContent}>
          <ul className={styles.menuLateral}>
            <li>
              <button 
                onClick={() => setMostrarCalificacion(!mostrarCalificacion)}
                className={styles.menuButton}
                style={{ color: 'black', fontWeight: 'bold' }}
              >
                Calificación General
              </button>
            </li>
            <li>
              <button 
                onClick={() => setMostrarAgenda(!mostrarAgenda)}
                className={styles.menuButton}
                style={{ color: 'black', fontWeight: 'bold' }}
              >
                Agenda
              </button>
            </li>
            <li>
              <button 
                onClick={() => router.push('/hairdresser/reservas')}
                className={styles.menuButton}
                style={{ color: 'black', fontWeight: 'bold' }}
              >
                Reservas
              </button>
            </li>
            <li>
              <button 
                onClick={() => setMostrarFeedback(!mostrarFeedback)}
                className={styles.menuButton}
                style={{ color: 'black', fontWeight: 'bold' }}
              >
                Feedback
              </button>
            </li>
            <li>
              <button 
                onClick={() => router.back()} 
                className={`${styles.menuButton} ${styles.backButton}  `}
                style={{ color: 'black' , fontWeight: 'bold' }}
              >
                Atrás
              </button>
            </li>
          </ul>

          {mostrarCalificacion && (
            <div className={styles.calificacionDisplay}>
              <span className={styles.calificacionNumero}>
                {calcularPromedioCalificacion()}
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
                events={calendarEvents}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                locale="es"
                eventContent={(eventInfo) => (
                  <div className="p-1">
                    <div className="font-bold text-sm">{eventInfo.event.title}</div>
                    <div className="text-xs">
                      {eventInfo.event.start ? format(eventInfo.event.start, 'HH:mm') : ''} - 
                      {eventInfo.event.end ? format(eventInfo.event.end, 'HH:mm') : ''}
                    </div>
                  </div>
                )}
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