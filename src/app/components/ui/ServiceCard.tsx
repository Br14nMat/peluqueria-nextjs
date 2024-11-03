// ServiceCard.tsx
"use client";

import { Card, CardContent } from "./card";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  imgUrl: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({id, name, description, price, duration, imgUrl }) => {
  const router = useRouter();

  const handleReservarClick = () => {
    localStorage.setItem('servicio', JSON.stringify({ id, name, duration }));
    router.push('/calendario');
  };

  return (
    <Card className="bg-azulPastel">
      <CardContent className="p-3">
        <div className="flex gap-4">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
            <Image
              className="rounded-lg"
              src={imgUrl}
              alt="service img"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>

          <div className="flex flex-col w-full">
            <h2 className="text-azulOscuro font-bold md:text-xl">{name}</h2>
            <p className="text-sm text-gray-500">{description}</p>

            <div className="flex items-center justify-between mt-3">
              <p className="text-azulOscuro text-lg font-bold">
                {Intl.NumberFormat('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(price)}
              </p>
              <button
                onClick={handleReservarClick}
                className="bg-rosado hover:bg-azulClaro flex items-center justify-center p-3 rounded-lg text-white transition-all mx-4"
              >
                Reservar
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
