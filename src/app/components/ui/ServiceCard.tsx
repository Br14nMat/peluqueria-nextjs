'use client'

import { StarIcon } from "@primer/octicons-react"
import { Badge } from "./badge"
import { Card, CardContent } from "./card"

interface ServiceCardProps {
  name: string;
  price: number;
  duration: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ name, price, duration }) => {
  return (
    <Card className="max-w-full min-w-full rounded-xl bg-foreground">
      <CardContent className="px-1 py-0 pt-1">
        <div className="relative h-[120px] w-full">
          <div className="absolute top-2 left-2 z-50">
            <Badge
              variant="secondary"
              className=" text-black opacity-90 flex gap-1 items-center justify-center "
            >
              <StarIcon className="text-yellow-500"></StarIcon>
              <span className="text-xs">{price.toFixed(1)}</span>
            </Badge>
          </div>
        </div>

        <div className="px-2 pb-3">
          <h1 className="text-black font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">
            {name}
          </h1>
          <p className="text-sm text-navbar overflow-hidden text-ellipsis text-nowrap">
            {duration}
          </p>
          <button className="flex items-center justify-center p-3 rounded-lg bg-button_hover text-white hover:bg-gray-600 transition-all mx-4">
            Reservar
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceCard;
