'use client';

import React, { useEffect, useState } from "react";
import ReservationCard, { ReservationCardProps } from "@/app/components/ui/ReservationCard";
import { getReservationsByHairdresser, deleteReservation, Reservation } from "@/services/reservation.service";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { useRouter } from "next/router";

export default function HairdresserReservations() {
    const [reservations, setReservations] = useState<ReservationCardProps[]>([]);
    const [isMounted, setIsMounted] = useState(false);  // Control de montaje
    const { user: currentUser } = useCurrentUser();
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);  // Setea el estado a `true` después de que se monta el componente en el cliente
    }, []);

    useEffect(() => {
        async function loadReservations() {
            try {
                if (!currentUser?.token) return;
                const data = await getReservationsByHairdresser(currentUser.user_id, currentUser.token);
                setReservations(data);
            } catch (error) {
                console.error("Error al obtener las reservas", error);
            }
        }
        if (isMounted && currentUser?.token) {  // Solo carga las reservas si ya se montó el componente
            loadReservations();
        }
    }, [currentUser, isMounted]); // Dependencias ajustadas

    const handleEdit = (reservationId: string) => {
        router.push(`/reservations/edit/${reservationId}`);
    };

    const handleDelete = async (reservationId: string) => {
        if (!currentUser?.token) return;

        try {
            await deleteReservation(reservationId, currentUser.token);
            setReservations(reservations.filter(reservation => reservation.id !== reservationId));
        } catch (error) {
            console.error("Error al eliminar la reserva", error);
        }
    };

    if (!isMounted) return null;  // Evita el renderizado antes de que el componente se haya montado en el cliente

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
                    actions={
                        <>
                            <button
                                onClick={() => handleEdit(reservation.id)}
                                className="px-4 py-2 mr-2 bg-blue-500 text-white rounded"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(reservation.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded"
                            >
                                Eliminar
                            </button>
                        </>
                    }
                />
            ))}
        </div>
    );
}
