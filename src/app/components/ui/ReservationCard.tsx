'use client'

import { CircleIcon, ClockIcon, StarIcon, TrashIcon, XIcon } from "@primer/octicons-react";
import { Badge } from "./badge";
import { Card, CardContent } from "./card";
import { Service } from "@/services/services.service";
import { User } from "@/interface/user";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { removeReservation } from "@/store/reservation/reservationSlice";
import { useAppDispatch } from "@/store";

export interface ReservationCardProps {
  reservation: {
    id: string;
    reservationDate: Date;
    serviceDate: Date;
    status: string;
    hairdresser: User;
    service: Service;
    client: User;
  };
  onComplete: () => void;
  showCompleteButton: boolean;
  onDelete: () => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  onComplete,
  showCompleteButton,
  onDelete,
}) => {
  const { id, reservationDate, serviceDate, status, hairdresser, service, client } = reservation;
  
  return (
      <Card className="bg-azulPastel min-w-full">
          <CardContent className="py-0 flex px-0 relative">
              <div className="flex flex-col gap-2 py-5 md:py-3 flex-[3] pl-5 md:pl-3">
                  <Badge className="bg-azulOscuro w-fit">
                      {status}
                  </Badge>

                  <h2 className="text-azulOscuro mx-2 font-bold md:text-base">{service.name}</h2>
                  <p className="text-azulOscuro mx-3">{hairdresser.name}</p>
                  {showCompleteButton && (
                      <button
                          onClick={onComplete}
                          className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition-colors w-fit mx-2"
                      >
                          Finalizar
                      </button>
                  )}
              </div>
              <div className="bg-azulOscuro rounded-lg flex flex-col items-center justify-center flex-1 border-l border-solid border-secondary">
                  <p className="text-sm capitalize">
                      {format(reservationDate, 'MMMM', { locale: es })}
                  </p>
                  <p className="text-2xl">{format(reservationDate, 'dd')}</p>
                  <p className="text-sm">{format(reservationDate, 'hh:mm')}</p>
              </div>
          </CardContent>
      </Card>
  );
}

export default ReservationCard;
