"use client";

import React, { useEffect } from "react";
import { getServices, Service } from "@/services/services.service";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import ServiceCard from "@/app/components/ui/ServiceCard";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchServices, removeService, setSelectedService } from "@/store/service/serviceSlice";
import { useRouter } from 'next/navigation';
import { Card, CardContent } from "@/app/components/ui/card";
import Image from 'next/image';

export default function Servicios() {
    const router = useRouter();
    const { user: currentUser } = useCurrentUser();
    const dispatch = useAppDispatch();
    const services = useAppSelector((state) => state.services.list);

    useEffect(() => {
        async function loadServices() {
            if (!currentUser?.token) return;
            try {
                await dispatch(fetchServices({ token: currentUser.token }));
            } catch (error) {
                console.error("Error al obtener los servicios:", error);
            }
        }
        loadServices();
    }, [currentUser, dispatch]);

    const handleCreate = () => {
        router.push("/admin/crear-servicio");
    };

    const handleEditar = (service: Service) => {
        dispatch(setSelectedService(service));
        router.push("/admin/editar-servicio");
    };

    const handleEliminar = (id: string) => {
        dispatch(removeService({ id: id, token: currentUser?.token }))
            .then(() => alert('Servicio eliminado exitosamente'))
            .catch((e) => console.error(e));
    };

    return (
        <div className="overflow-scroll">
            <button
                onClick={handleCreate}
                className="bg-rosadoOscuro p-2 m-3 hover:bg-azulClaro flex items-center justify-center rounded-lg text-white transition-all"
            >
                Crear servicio
            </button>
            <div className="bg-white grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                {services.map(service => (
                    <Card key={service.id} className="bg-azulPastel">
                        <CardContent className="p-3">
                            <div className="flex gap-4">
                                <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
                                    <Image
                                        className="rounded-lg"
                                        src={service.imgUrl || '/logo.jpg'}
                                        alt="service img"
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>

                                <div className="flex flex-col w-full">
                                    <h2 className="text-azulOscuro font-bold md:text-xl">{service.name}</h2>
                                    <p className="text-sm text-gray-500">{service.description}</p>

                                    <div className="flex items-center justify-between mt-3">
                                        <p className="text-azulOscuro text-lg font-bold">
                                            {Intl.NumberFormat('es-CO', {
                                                style: 'currency',
                                                currency: 'COP',
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0
                                            }).format(service.price)}
                                        </p>
                                        <div className="flex items-center justify-between mt-3">
                                          <button
                                              onClick={() => handleEliminar(service.id)}
                                              className="bg-rosado hover:bg-rosadoOscuro flex items-center justify-center p-3 rounded-lg text-white transition-all mx-4"
                                          >
                                              Eliminar
                                          </button>
                                          <button
                                              onClick={() => handleEditar(service)}
                                              className="bg-azulClaro hover:bg-azulOscuro flex items-center justify-center p-3 rounded-lg text-white transition-all mx-4"
                                          >
                                              Editar
                                          </button>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
