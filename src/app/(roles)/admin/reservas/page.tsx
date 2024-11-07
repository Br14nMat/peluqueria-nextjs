"use client";

import React, { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { getReservationsByClient, ReservationDTO } from "@/services/reservation.service";
import ReservationCard from "@/app/components/ui/ReservationCard";

export default function Reservations() {
    const [reservations, setReservations] = useState<ReservationDTO[]>([]);
    const { user: currentUser } = useCurrentUser();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadReservations() {
            try {
                if (!currentUser?.token) {
                    console.log("No se encontró el token del usuario.");
                    return;
                }

                console.log("Token encontrado:", currentUser.token);

                const data = await getReservationsByClient(currentUser.user_id, currentUser.token);
                console.log("Datos de reservas recibidos:", data);

                const formattedData = data.map(reservation => ({
                    ...reservation,
                    reservationDate: new Date(reservation.reservationDate),
                    serviceDate: new Date(reservation.serviceDate)
                }));

                setReservations(formattedData);
            } catch (error) {
                console.error("Error al obtener las reservas", error);
            } finally {
                setLoading(false);
            }
        }

        loadReservations();
    }, [currentUser]);

    if (loading) {
        return <p>Cargando reservas...</p>;
    }

    return (
        <div className="p-5 m-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            <p>Prueba de renderizado de reservas:</p>
            
            {/* Reserva de prueba 1 */}
            <ReservationCard
                id="test-id"
                reservationDate={new Date()}
                serviceDate={new Date()}
                status="Pendiente"
                hairdresser={{ user_id: "123", name: "Peluquero de Prueba", email: "peluquero@prueba.com", token: "dummy-token" }}
                service={{
                    id: "321",
                    name: "Corte de prueba",
                    description: "Corte básico",
                    price: 15,
                    duration: 30,
                    imgUrl: "https://via.placeholder.com/150"
                }}
                client={{ user_id: "client-id", name: "Cliente de Prueba", email: "cliente@prueba.com", token: "dummy-token" }}
            />

            {/* Reserva de prueba 2 */}
            <ReservationCard
                id="test-id-2"
                reservationDate={new Date()}
                serviceDate={new Date()}
                status="Confirmada"
                hairdresser={{ user_id: "456", name: "Peluquero Secundario", email: "peluquero2@prueba.com", token: "dummy-token" }}
                service={{
                    id: "654",
                    name: "Tinte de prueba",
                    description: "Tinte básico",
                    price: 40,
                    duration: 60,
                    imgUrl: "https://via.placeholder.com/150"
                }}
                client={{ user_id: "client-id-2", name: "Cliente Secundario", email: "cliente2@prueba.com", token: "dummy-token" }}
            />

            {/* Renderizar reservas reales */}
            {reservations.length === 0 ? (
                <p>No hay reservas registradas.</p>
            ) : (
                reservations.map((reservation) => (
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
            )}
        </div>
    );
}
