"use client";

import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { User } from '@/interface/user';
import { getHaidressers } from '@/services/hairdresser.service';
import { createReservation } from '@/services/reservation.service';
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';
import { useRouter } from 'next/navigation';


const Calendario = () => {
  const router = useRouter();

  const [servicio, setServicio] = useState<{ id: string, name: string; duration: number } | null>(null);

  const [reservationDate, setReservationDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const [hairdressers, setHairdressers] = useState<User[]>([]);
  const [selectedHairdresser, setSelectedHairdresser] = useState<any | null>(null);

  const { user:currentUser } = useCurrentUser();

  useEffect(() => {
    const storedService = localStorage.getItem('servicio');
    if (storedService) {
      setServicio(JSON.parse(storedService));
    }

    const fetchHairdressers = async () => {
      const data = await getHaidressers();
      setHairdressers(data);
    };

    fetchHairdressers();

  }, []);

  const handleDateClick = (arg: any) => {
    if (servicio) {
      setReservationDate(arg.date)
      setEndDate(new Date(arg.date.getTime() + servicio.duration * 60000))
    }
  };

  function obtenerHoraFormateada(fecha: Date) {
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const ampm = horas >= 12 ? 'PM' : 'AM';

    const hora12 = horas % 12 || 12;

    return `${hora12}:${minutos} ${ampm}`;
  }


  const handleReservarClick = () => {

    const reservationData: any = {
      reservationDate,
      serviceDate: new Date(),
      status: 'PENDIENTE',
      hairdresserId: selectedHairdresser?.id,
      serviceId: servicio?.id,
      clientId: currentUser?.user_id
    };

    createReservation(reservationData, currentUser?.token)
        .then(reservation => {
            alert('Reservación creada con exito!')
            router.push('/reservas')
        })
        .catch(error => {
            console.error('Error creating reservation:', error);
        });
  }

  return (
    <div className='bg-white p-7 max-w-full'>

      <div className='flex'>
        <div>
          <label className='text-azulOscuro' htmlFor="hairdresser">Selecciona un peluquero: </label>
          <select
            id="hairdresser"
            value={selectedHairdresser?.name || ""}
            onChange={(e) => {
              const selected = hairdressers.find(hairdresser => hairdresser.name === e.target.value);
              setSelectedHairdresser(selected || null);
            }}
            className="mb-4 p-2 border rounded text-azulClaro"
          >
            <option value="" disabled>Selecciona un peluquero</option>
            {hairdressers.map((hairdresser) => (
              <option key={hairdresser.email} value={hairdresser.name}>
                {hairdresser.name}
              </option>
            ))}
          </select>

          <p className='text-azulOscuro my-2'>
            Horario inicio seleccionada: 
            {obtenerHoraFormateada(reservationDate || new Date())} 
          </p>

          <p className='text-azulOscuro my-3'>
            Horario finalización: 
            {obtenerHoraFormateada(endDate || new Date())} 
          </p>
        </div>

        <div className='mx-3'>
          <button
                    onClick={handleReservarClick}
                    className="bg-rosado hover:bg-azulClaro flex items-center justify-center p-3 rounded-lg text-white transition-all mx-4"
          >
                    Confirmar
          </button>

        </div>

      </div>
      <div className='text-azulOscuro'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          selectable={true}
          slotMinTime="07:00:00"
          slotMaxTime="18:00:00"
          contentHeight={650}
          dateClick={handleDateClick}
        />

      </div>
      


    </div>
  );
};

export default Calendario;
