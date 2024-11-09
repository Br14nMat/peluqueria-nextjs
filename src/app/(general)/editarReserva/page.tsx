// pages/reservations/edit/[id].tsx
"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";

interface Reservation {
  id: string;
  clientName: string;
  serviceName: string;
  date: string;
  time: string;
}

export default function EditReservation() {
  const router = useRouter();
  const { id } = router.query; // Obtiene el ID de la URL
  const { user: currentUser } = useCurrentUser();
  const [reservation, setReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    // Verificar rol de usuario
    if (!currentUser || (currentUser.rol !== 'haurdresser' && currentUser.rol !== 'admin')) {
      router.push('/login');
      return;
    }

    if (!id || !currentUser?.token) return; // Si no hay ID o no hay token, no hacemos la llamada

    // Llamar al backend para obtener los datos de la reserva
    async function fetchReservation() {
      try {
        const response = await fetch(`http://localhost:3000/api/reservations/${id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${currentUser?.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("No se pudo obtener la reserva");
        }

        const data = await response.json();
        setReservation(data);
      } catch (error) {
        console.error("Error al cargar la reserva:", error);
      }
    }

    fetchReservation();
  }, [id, currentUser, router]);

  const handleSave = async () => {
    if (!reservation || !currentUser?.token) return;

    try {
      const response = await fetch(`http://localhost:5000/api/reservations/${reservation.id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${currentUser.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservation),
      });

      if (!response.ok) {
        throw new Error("Error al guardar la reserva");
      }

      router.push("/reservations"); // Redirige de nuevo a la lista de reservas
    } catch (error) {
      console.error("Error al actualizar la reserva:", error);
    }
  };

  return (
    <div className="bg-white p-4">
      {reservation ? (
        <div>
          <h2 className="text-2xl font-semibold">Editar Reserva</h2>
          <div className="mt-4">
            <label className="block">Nombre del Cliente</label>
            <input
              type="text"
              value={reservation.clientName}
              onChange={(e) => setReservation({ ...reservation, clientName: e.target.value })}
              className="border p-2 w-full"
            />
          </div>

          <div className="mt-4">
            <label className="block">Servicio</label>
            <input
              type="text"
              value={reservation.serviceName}
              onChange={(e) => setReservation({ ...reservation, serviceName: e.target.value })}
              className="border p-2 w-full"
            />
          </div>

          <div className="mt-4">
            <label className="block">Fecha</label>
            <input
              type="date"
              value={reservation.date}
              onChange={(e) => setReservation({ ...reservation, date: e.target.value })}
              className="border p-2 w-full"
            />
          </div>

          <div className="mt-4">
            <label className="block">Hora</label>
            <input
              type="time"
              value={reservation.time}
              onChange={(e) => setReservation({ ...reservation, time: e.target.value })}
              className="border p-2 w-full"
            />
          </div>

          <button
            onClick={handleSave}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Guardar cambios
          </button>
        </div>
      ) : (
        <p>Cargando reserva...</p>
      )}
    </div>
  );
}
