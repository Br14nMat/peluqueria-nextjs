"use client";

import React, { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import ReservationCard from "@/app/components/ui/ReservationCard";
import { getHairdresserReservations, markReservationAsCompleted } from "@/services/reservation.service";
import { Service } from "@/services/services.service";
import { User } from "@/interface/user";
import { Navbar } from "@/app/hairdresser/components/nav-bar/NavBar";

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
            setReservations((prevReservations) =>
                prevReservations.filter((reservation) => reservation.id !== reservationId)
            );
        } catch (error) {
            console.error("Error al marcar la reserva como completada", error);
        }
    };

    const handleDeleteReservation = (reservationId: string) => {
        setReservations((prevReservations) =>
            prevReservations.filter((reservation) => reservation.id !== reservationId)
        );
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="p-7">
                <h2 className="text-2xl font-bold mb-6 text-black">Mis Reservas</h2>
                {reservations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {reservations.map((reservation) => (
                            <ReservationCard
                                key={reservation.id}
                                reservation={reservation}
                                onComplete={() => handleCompleteReservation(reservation.id)}
                                onDelete={() => handleDeleteReservation(reservation.id)}
                                showCompleteButton={true}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-black text-lg">No tienes reservas pendientes</p>
                )}
            </div>
        </div>
    );
}
