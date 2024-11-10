"use client";

import { Service } from '@/services/services.service';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/store";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { addService } from '@/store/service/serviceSlice';


export default function EditarServicio () {

    const dispatch = useAppDispatch();
    const selectedService = useAppSelector((state) => state.services.selectedService);

    const { user:currentUser } = useCurrentUser();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    const [price, setPrice] = useState(0);
    const [duration, setDuration] = useState(0);


    const handleSubmit = () => {

        const serviceData: Service = {
            id: '',
            name,
            description,
            price,
            duration,
            imgUrl,
        }

        dispatch(addService({ s: serviceData, token: currentUser?.token }))
            .then(() => {
                alert('Servicio creado exitosamente');
            })
            .catch((e) => console.error(e));


    }

    return(
        <div className="my-4 w-full flex justify-center space-y-2">
            <form className="bg-white p-4 rounded-md shadow">
                <h1 className='text-azulOscuro py-2'>Agregar servicio</h1>

                <label className="block mb-2 text-gray-700">Nombre:</label>
                <input
                    value={selectedService?.name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-azulOscuro w-full h-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder="Escriba el nombre"
                ></input>

                <label className="block mb-2 text-gray-700">Descripción:</label>
                <textarea
                    value={selectedService?.description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="text-azulOscuro w-full h-16 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder="Escriba la descripción aquí"
                ></textarea>

                <label className="block mb-2 text-gray-700">Precio:</label>
                <input
                    value={selectedService?.price}
                    type='number'
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="text-azulOscuro w-full h-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder="Escriba el precio"
                ></input>

                <label className="block mb-2 text-gray-700">Duración:</label>
                <input
                    type='number'
                    value={selectedService?.duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="text-azulOscuro w-full h-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder="Escriba la duración en min"
                ></input>
                
                <label className="block mb-2 text-gray-700">Imagen:</label>
                <input
                    value={selectedService?.imgUrl}
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
    )
}