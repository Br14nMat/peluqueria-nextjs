"use client";

import React, { useEffect, useState } from "react";
import { getServices, Service } from "@/services/services.service";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import ServiceCard from "@/app/components/ui/ServiceCard";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchServices } from "@/store/service/serviceSlice";


export default function Servicios() {

    const { user:currentUser } = useCurrentUser();
    const dispatch = useAppDispatch();

    const services = useAppSelector((state) => state.services.list);

    useEffect(() => {
        async function loadServices() {
            try {
                
                if (!currentUser?.token) return;
                dispatch(fetchServices({ token: currentUser.token }));
                
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
