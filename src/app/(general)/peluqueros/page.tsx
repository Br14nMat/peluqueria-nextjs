"use client";

import React, { useEffect, useState } from "react";
import ServiceCard from "@/app/components/ui/ServiceCard";
import { getServices, Service } from "@/services/services.service";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import HairdresserCard from "@/app/components/ui/HairdresserCard";
import { User } from "@/interface/user";
import { getHaidressers } from "@/services/hairdresser.service";

export default function Hairdressers() {
    const [hairdressers, setHairdressers] = useState<User[]>([]);
    const { user:currentUser } = useCurrentUser();

    useEffect(() => {
        async function loadHairdressers() {
            try {
                
                if (!currentUser?.token) return;

                const data = await getHaidressers(currentUser.token);
                setHairdressers(data);
            
            } catch (error) {
                console.error("Error al obtener los peluqueros", error);
            }
        }
        
        loadHairdressers();
    }, [currentUser]);

    return (
        <div className="bg-white grid grid-cols-1 md:grid-cols-4 gap-6 p-7">            {hairdressers.map(hairdresser => (
                <HairdresserCard
                key={hairdresser.email}
                id= {hairdresser.user_id}
                name={hairdresser.name}
                email={hairdresser.email}
                />
            ))
            }
        </div>
    );
}
