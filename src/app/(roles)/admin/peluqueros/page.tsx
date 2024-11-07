"use client";

import React, { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import HairdresserCard from "@/app/components/ui/HairdresserCard";
import { getHaidressers } from "@/services/hairdresser.service";
import { User } from "@/interface/user";

export default function Hairdressers() {
    const [hairdressers, setHairdressers] = useState<User[]>([]);
    const { user: currentUser } = useCurrentUser();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadHairdressers() {
            try {
                if (!currentUser?.token) {
                    console.log("No se encontró el token del usuario.");
                    return;
                }

                console.log("Token encontrado:", currentUser.token);
                
                const data = await getHaidressers(currentUser.token);
                console.log("Datos de peluqueros recibidos:", data);

                setHairdressers(data);
            } catch (error) {
                console.error("Error al obtener los peluqueros", error);
            } finally {
                setLoading(false);
            }
        }

        loadHairdressers();
    }, [currentUser]);

    if (loading) {
        return <p>Cargando peluqueros...</p>;
    }

    return (
        <div className="p-7">
            <p>Prueba de renderizado de peluqueros:</p>
            
            {/* Peluquero de prueba 1 */}
            <HairdresserCard
                id="123"
                name="Peluquero de Prueba"
                email="peluquero@prueba.com"
            />
            <br></br>
            {/* Peluquero de prueba 2 */}
            <HairdresserCard
                id="456"
                name="Peluquero Secundario"
                email="peluquero2@prueba.com"
            />

            {/* Renderizar las tarjetas de peluqueros reales */}
            <div className="bg-white grid grid-cols-1 md:grid-cols-4 gap-6">
                {hairdressers.map((hairdresser) => (
                    <HairdresserCard
                        key={hairdresser.email}
                        id={hairdresser.user_id}
                        name={hairdresser.name}
                        email={hairdresser.email}
                    />
                ))}
            </div>
        </div>
    );
}
