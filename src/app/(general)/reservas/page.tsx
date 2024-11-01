"use client";

import React, { useEffect, useState } from "react";
import ServiceCard from "@/app/components/ui/ServiceCard";
import { getServices, Service } from "@/services/services.service";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import HairdresserCard from "@/app/components/ui/HairdresserCard";
import { Haidresser } from "@/services/hairdresser.service";
import ReservationCard from "@/app/components/ui/ReservationCard";
import { Reservation } from "@/services/reservation.service";

export default function Reservations() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const { user:currentUser } = useCurrentUser();

    useEffect(() => {
        async function loadReservations() {
            try {
                
                if (!currentUser?.token) return;

            
            } catch (error) {
                console.error("Error al obtener los peluqueros", error);
            }
        }
        
        loadReservations();
    }, [currentUser]);

    return (
        <div className="space-y-2">
            {reservations.map(reservation => (
                <ReservationCard
                key={reservation.id}
                reservationDate={reservation.reservationDate}
                serviceDate={reservation.serviceDate}
                status={reservation.status}
                hairdresser={reservation.hairdresser}
                service={reservation.service}
                />
            ))
            }
        </div>
    );
}
