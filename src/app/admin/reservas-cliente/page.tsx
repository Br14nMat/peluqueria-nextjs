"use client";

import React, { useEffect } from "react";
import ReservationCard, { ReservationCardProps } from "@/app/components/ui/ReservationCard";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchReservationsByClient, removeReservation } from "@/store/reservation/reservationSlice";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';


export default function Reservations() {
    const dispatch = useAppDispatch();

    const reservations = useAppSelector((state) => state.reservations.list);
    
    const { user: currentUser } = useCurrentUser();

    useEffect(() => {
        if (currentUser?.token) {
            dispatch(fetchReservationsByClient({ clientId: currentUser.user_id, token: currentUser.token }));
        }

    }, [currentUser, dispatch]);


    return (
        <div className="p-5 m-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            {reservations.map((reservation) => (
                <Card key={reservation.id} className="bg-azulPastel min-w-full">
                    <CardContent className="py-0 flex px-0">
                        <div className="flex flex-col gap-2 py-5 md:py-3 flex-[3] pl-5 md:pl-3">
                            <Badge className="bg-azulOscuro w-fit">
                                {reservation.status}
                            </Badge>
        
                            <h2 className="text-azulOscuro mx-2 font-bold md:text-base">{reservation.service.name}</h2>
                            <p className="text-azulOscuro mx-3">{reservation.hairdresser.name}</p>
                        </div>
                        <div className="bg-azulOscuro rounded-lg flex flex-col items-center justify-center flex-1 border-l border-solid border-secondary">
                            <p className="text-sm capitalize">
                                {format(reservation.reservationDate, 'MMMM', { locale: es })}
                            </p>
                            <p className="text-2xl">{format(reservation.reservationDate, 'dd')}</p>
                            <p className="text-sm">{format(reservation.reservationDate, 'hh:mm')}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
