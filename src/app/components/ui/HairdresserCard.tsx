'use client'

import { ClockIcon, StarIcon } from "@primer/octicons-react"
import { Badge } from "./badge"
import { Card, CardContent } from "./card"
import { Service } from "@/services/services.service"

interface HairdresserCardProps {
  name: string;
  email: string
}

const HairdresserCard: React.FC<HairdresserCardProps> = ({ name, email }) => {
  return (
    <Card className="max-w-full min-w-full rounded-xl bg-foreground">
      <CardContent className="px-1 py-0 pt-1">
        
        <div className="px-2 pb-3">
          <h1 className="text-black font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">
            {name}
          </h1>
          <p className="text-sm text-navbar overflow-hidden text-ellipsis text-nowrap">
            {email}
          </p>
          <button className="flex items-center justify-center p-3 rounded-lg bg-button_hover text-white hover:bg-gray-600 transition-all mx-4">
            Reseñar
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

export default HairdresserCard;
