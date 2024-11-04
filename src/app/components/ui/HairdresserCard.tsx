'use client'

import { ClockIcon, StarIcon } from "@primer/octicons-react"
import { Badge } from "./badge"
import { Card, CardContent } from "./card"
import { Service } from "@/services/services.service"
import { useRouter } from 'next/navigation';

interface HairdresserCardProps {
  id: string;
  name: string;
  email: string
}


const HairdresserCard: React.FC<HairdresserCardProps> = ({ id, name, email }) => {

  const router = useRouter();

  const handleReseñar = () => {
    localStorage.setItem('hairdresser', JSON.stringify({ id, name, email }));
    router.push('/comentarios');
  }

  return (
    <Card className="bg-azulPastel max-w-full min-w-full rounded-xl">
      <CardContent className="px-1 py-0 pt-1">
        
        <div className="px-2 pb-3">
          <h1 className="text-azulOscuro font-bold m-3 text-lg overflow-hidden text-ellipsis text-nowrap">
            {name}
          </h1>
          <p className="text-azulOscuro text-sm mx-5 my-3 overflow-hidden text-ellipsis text-nowrap">
            {email}
          </p>
          <button onClick={() => handleReseñar()} className="bg-rosado text-white  hover:bg-azulOscuro  flex items-center justify-center p-3 rounded-lg transition-all mx-4">
            Reseñar
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

export default HairdresserCard;
