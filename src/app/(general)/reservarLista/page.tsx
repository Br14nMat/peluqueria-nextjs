"use client";

import React, { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import Link from "next/link";

interface Reservation {
  id: string;
  clientName: string;
  serviceName: string;
  date: string;
  time: string;
}

export default function ReservationsList() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const { user: currentUser } = useCurrentUser();  // Asegúrate de que currentUser tiene el id del peluquero

  // Llamada al backend para obtener las reservas
  useEffect(() => {
    async function loadReservations() {
      if (!currentUser?.token || !currentUser?.id) return;

      try {
        const response = await fetch(`http://localhost:3000/api/reservations/hairdresser/${currentUser.id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${currentUser.token}`,  // Incluye el token en los headers
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener las reservas");
        }
        const data = await response.json();
        console.log("Reservations fetched:", data);  // Verifica los datos
        setReservations(data);
      } catch (error) {
        console.error("Error loading reservations:", error);
      }
    }

    loadReservations();
  }, [currentUser]);  // Ejecutar cuando `currentUser` cambia

  // Eliminar una reserva
  const handleDelete = async (reservationId: string) => {
    if (!currentUser?.token) return;

    try {
      const response = await fetch(`http://localhost:5000/api/reservations/${reservationId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${currentUser.token}`,  // Incluye el token en los headers
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la reserva");
      }

      setReservations((prev) => prev.filter((res) => res.id !== reservationId));
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  return (
    <div className="bg-white p-4 space-y-4">
      {reservations.length === 0 ? (
        <p className="text-gray-600 text-center">No hay reservas disponibles en este momento.</p>
      ) : (
        reservations.map((reservation) => (
          <div key={reservation.id} className="p-4 border rounded shadow-md flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{reservation.clientName}</h2>
              <p className="text-sm text-gray-600">Service: {reservation.serviceName}</p>
              <p className="text-sm text-gray-600">Date: {reservation.date}</p>
              <p className="text-sm text-gray-600">Time: {reservation.time}</p>
            </div>
            <div className="flex space-x-2">
              <Link href={`/reservations/edit/${reservation.id}`}>
                <button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
              </Link>
              <button
                onClick={() => handleDelete(reservation.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
