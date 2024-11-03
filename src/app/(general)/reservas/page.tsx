"use client";

import React, { useEffect, useState } from "react";
import ServiceCard from "@/app/components/ui/ServiceCard";
import { getServices, Service } from "@/services/services.service";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import HairdresserCard from "@/app/components/ui/HairdresserCard";
import ReservationCard, { ReservationCardProps } from "@/app/components/ui/ReservationCard";
import { getReservations, getReservationsByClient, Reservation } from "@/services/reservation.service";

export default function Reservations() {
    const [reservations, setReservations] = useState<ReservationCardProps[]>([]);
    const { user:currentUser } = useCurrentUser();

    useEffect(() => {
        async function loadReservations() {
            try {
                
                if (!currentUser?.token) return;
                const data = await getReservationsByClient(currentUser.user_id, currentUser?.token);
                setReservations(data)
            } catch (error) {
                console.error("Error al obtener las reservas", error);
            }
        }
        
        loadReservations();
    }, [currentUser]);

    return (
        <div className="p-5 m-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            {reservations.map(reservation => (
                <ReservationCard
                key={reservation.id}
                id={reservation.id}
                reservationDate={reservation.reservationDate}
                serviceDate={reservation.serviceDate}
                status={reservation.status}
                hairdresser={reservation.hairdresser}
                service={reservation.service}
                client={reservation.client}
                />
            ))
            }
        </div>

    );
}
