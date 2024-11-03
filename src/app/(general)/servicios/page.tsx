"use client";

import React, { useEffect, useState } from "react";
import { getServices, Service } from "@/services/services.service";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import ServiceCard from "@/app/components/ui/ServiceCard";

export default function Servicios() {
    const [services, setServices] = useState<Service[]>([]);
    const { user:currentUser } = useCurrentUser();

    useEffect(() => {
        async function loadServices() {
            try {
                
                if (!currentUser?.token) return;

                const data = await getServices(currentUser?.token);
                setServices(data);
            } catch (error) {
                console.error("Error al obtener los servicios:", error);
            }
        }
        
        loadServices();
    }, [currentUser]);

    return (
        <div className="bg-white grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            {services.map(service => (
                <ServiceCard
                    key={service.id}
                    id={service.id}
                    name={service.name}
                    description={service.description}
                    duration={service.duration}
                    price={service.price}
                    imgUrl={service.imgUrl}
                />
            ))}
        </div>
    );
}
