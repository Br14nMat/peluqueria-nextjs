'use client'

import { ClockIcon, StarIcon } from "@primer/octicons-react"
import { Badge } from "./badge"
import { Card, CardContent } from "./card"
import { Service } from "@/services/services.service"
import Image from 'next/image'


interface ServiceCardProps {
  name: string;
  description: string;
  price: number;
  duration: number;
  imgUrl: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ name, description, price, duration, imgUrl }) => {
  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex gap-4">

          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
            <Image
              className="rounded-lg"
              src= {imgUrl}
              alt = "service img"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>


          <div className="flex flex-col w-full">
            <h2 className="font-bold md:text-sm">{name}</h2>
            <p className="text-sm text-gray-400">{description}</p>

            <div className="flex items-center justify-between mt-3">
              <p className="text-primary text-sm font-bold">
              {Intl.NumberFormat('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0 
              }).format(price)}
              </p>
              <button className="flex items-center justify-center p-3 rounded-lg bg-button_hover text-white hover:bg-gray-600 transition-all mx-4">
                 Reservar
                </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceCard;
