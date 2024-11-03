'use client'

import { CircleIcon, ClockIcon, StarIcon, TrashIcon, XIcon } from "@primer/octicons-react"
import { Badge } from "./badge"
import { Card, CardContent } from "./card"
import { Service } from "@/services/services.service"
import { User } from "@/interface/user"
import { format, isFuture } from 'date-fns'
import { es } from 'date-fns/locale';
import { deleteReservation } from "@/services/reservation.service"
import { useRouter } from 'next/navigation';

export interface ReservationCardProps {
  id: string;
  reservationDate: Date;
  serviceDate: Date;
  status: string;
  hairdresser: User;
  service: Service;
  client: User
}

const handleDelete = async (id : string, token : string) => {
  const confirmed = window.confirm("¿Estás seguro de cancelar la reserva?");
  if (confirmed) {
      deleteReservation(id, token)
      .then(() => {
        alert('Reserva eliminada exitosamente!')
      })
      .catch((e: Error) => console.error(e))
      
  }
};

const ReservationCard: React.FC<ReservationCardProps> = ({ id, reservationDate, serviceDate, status, hairdresser, service, client}) => {
  

  return (
    <Card className="bg-azulPastel min-w-full">
      <CardContent className="py-0 flex px-0">
        <div className="flex flex-col gap-2 py-5 md:py-3 flex-[3] pl-5 md:pl-3">
          <Badge className="bg-azulOscuro w-fit">
            {status}
          </Badge>
          
          <h2 className="text-azulOscuro mx-2 font-bold md:text-base">{service.name}</h2>
          <p className="text-azulOscuro mx-3">{hairdresser.name}</p>
        </div>
        <div onClick={ () => handleDelete(id, client.token)} className="cursor-pointer">
          <TrashIcon className="bg-red-600 m-2"></TrashIcon>
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
  )
}

export default ReservationCard;
