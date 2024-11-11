"use client";

import React, { useEffect } from "react";
import ReservationCard, { ReservationCardProps } from "@/app/components/ui/ReservationCard";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchReservationsByClient, removeReservation } from "@/store/reservation/reservationSlice";

export default function Reservations() {
    const dispatch = useAppDispatch();

    const reservations = useAppSelector((state) => state.reservations.list);
    
    const { user: currentUser } = useCurrentUser();

    useEffect(() => {
        if (currentUser?.token) {
            dispatch(fetchReservationsByClient({ clientId: currentUser.user_id, token: currentUser.token }));
        }

    }, [currentUser, dispatch]);

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm("¿Estás seguro de cancelar la reserva?");
        if (confirmed && currentUser?.token) {
            try {
                await dispatch(removeReservation({ id, token: currentUser.token })).unwrap();
                alert("Reserva eliminada exitosamente!");
            } catch (error) {
                console.error("Error al eliminar la reserva:", error);
            }
        }
    };

    return (
        <div className="p-5 m-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            {reservations.map((reservation) => (
                <ReservationCard
                    key={reservation.id}
                    reservation={reservation}
                    onDelete={() => handleDelete(reservation.id)}
                    onComplete={() => {}}
                    showCompleteButton={false}
                />
            ))}
        </div>
    );
}
