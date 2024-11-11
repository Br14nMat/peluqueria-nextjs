"use client";

import { Service } from '@/services/services.service';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/store";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { addService, updateServiceAsync } from '@/store/service/serviceSlice';
import { useRouter } from 'next/navigation';

export default function EditarServicio () {
    const dispatch = useAppDispatch();
    const selectedService = useAppSelector((state) => state.services.selectedService);
    const { user: currentUser } = useCurrentUser();
    const router = useRouter();


    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [price, setPrice] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (selectedService) {
            setName(selectedService.name);
            setDescription(selectedService.description);
            setImgUrl(selectedService.imgUrl);
            setPrice(selectedService.price);
            setDuration(selectedService.duration);
        }
    }, [selectedService]);

    const handleSubmit = () => {
        const serviceData: Service = {
            id: selectedService?.id || '',
            name,
            description,
            price,
            duration,
            imgUrl,
        };

        dispatch(updateServiceAsync({ id: selectedService?.id || '', updatedData: serviceData, token: currentUser?.token }))
        .then(() => {
            alert('Servicio editado exitosamente');
        })
        .catch((e) => console.error(e));

        router.push("/admin/servicios")
        
    };

    return (
        <div className="my-4 w-full flex justify-center space-y-2">
            <form className="bg-white p-4 rounded-md shadow">
                <h1 className="text-azulOscuro py-2">Editar servicio</h1>

                <label className="block mb-2 text-gray-700">Nombre:</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-azulOscuro w-full h-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder="Escriba el nombre"
                ></input>

                <label className="block mb-2 text-gray-700">Descripción:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="text-azulOscuro w-full h-16 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder="Escriba la descripción aquí"
                ></textarea>

                <label className="block mb-2 text-gray-700">Precio:</label>
                <input
                    value={price}
                    type="number"
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="text-azulOscuro w-full h-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder="Escriba el precio"
                ></input>

                <label className="block mb-2 text-gray-700">Duración:</label>
                <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="text-azulOscuro w-full h-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder="Escriba la duración en min"
                ></input>

                <label className="block mb-2 text-gray-700">Imagen:</label>
                <input
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                    className="text-azulOscuro w-full h-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder="Escriba la url de la img"
                ></input>

                <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-rosado text-white font-semibold px-4 py-2 rounded-md mt-2 hover:bg-rosadoOscuro"
                >
                    Confirmar
                </button>
            </form>
        </div>
    );
}
