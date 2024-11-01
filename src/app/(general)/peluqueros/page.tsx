"use client";

import React, { useEffect, useState } from "react";
import ServiceCard from "@/app/components/ui/ServiceCard";
import { getServices, Service } from "@/services/services.service";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import HairdresserCard from "@/app/components/ui/HairdresserCard";
import { Haidresser } from "@/services/hairdresser.service";

export default function Hairdressers() {
    const [hairdressers, setHairdressers] = useState<Haidresser[]>([]);
    const { user:currentUser } = useCurrentUser();

    useEffect(() => {
        async function loadHairdressers() {
            try {
                
                if (!currentUser?.token) return;

            
            } catch (error) {
                console.error("Error al obtener los peluqueros", error);
            }
        }
        
        loadHairdressers();
    }, [currentUser]);

    return (
        <div className="space-y-2">
            {hairdressers.map(hairdresser => (
                <HairdresserCard
                key={hairdresser.id}
                name={hairdresser.name}
                email={hairdresser.email}
                />
            ))
            }
        </div>
    );
}
