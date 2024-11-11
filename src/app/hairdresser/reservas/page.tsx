"use client";

import React, { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import ReservationCard from "@/app/components/ui/ReservationCard";
import { getHairdresserReservations, markReservationAsCompleted } from "@/services/reservation.service";
import { Service } from "@/services/services.service";
import { User } from "@/interface/user";


interface Reservation {
    id: string;
    reservationDate: Date;
    serviceDate: Date;
    status: string;
    hairdresser: User;
    service: Service;
    client: User;
}

export default function HairdresserReservations() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const { user: currentUser } = useCurrentUser();

    useEffect(() => {
        async function loadReservations() {
            try {
                if (!currentUser?.token || !currentUser?.user_id) return;
                
                const data = await getHairdresserReservations(currentUser.user_id, currentUser.token);
                const formattedData = data.map(dto => ({
                    id: dto.id,
                    reservationDate: new Date(dto.reservationDate),
                    serviceDate: new Date(dto.serviceDate),
                    status: dto.status,
                    hairdresser: dto.hairdresser,
                    service: dto.service,
                    client: dto.client
                }));
                setReservations(formattedData);
            } catch (error) {
                console.error("Error al obtener las reservas", error);
            }
        }

        loadReservations();
    }, [currentUser]);

    const handleCompleteReservation = async (reservationId: string) => {
        try {
            if (!currentUser?.token) return;

            await markReservationAsCompleted(reservationId, currentUser.token);
            // Filtrar la reserva completada de la lista
            setReservations((prevReservations) =>
                prevReservations.filter((reservation) => reservation.id !== reservationId)
            );
        } catch (error) {
            console.error("Error al marcar la reserva como completada", error);
        }
    };

    return (
        <div className="bg-white grid grid-cols-1 md:grid-cols-3 gap-6 p-7">
            <h2 className="text-2xl font-bold mb-6">Mis Reservas</h2>
            {reservations.map((reservation) => (
                <ReservationCard
                    key={reservation.id}
                    reservation={reservation}
                    onComplete={() => handleCompleteReservation(reservation.id)}
                    onDelete={() => {}}
                />
            ))}
            {reservations.length === 0 && (
                <p className="text-center text-gray-500 col-span-full">No tienes reservas pendientes</p>
            )}
        </div>
    );
}
