"use client";
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';
import { createFeedback, Feedback, FeedbackDTO, getFeedbackByHairdresser } from '@/services/feedback.service';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


export default function Comentarios() {
    const { user: currentUser } = useCurrentUser();
    const [hairdresser, setHairdresser] = useState<any | null>(null);
    const [comentario, setComentario] = useState("");
    const [rating, setRating] = useState(1);
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

    const router = useRouter();

    useEffect(() => {
        const storedHairdresser = localStorage.getItem('hairdresser');
        if (storedHairdresser) {
            setHairdresser(JSON.parse(storedHairdresser));
        }
    }, []);

    useEffect(() => {
        async function loadComentarios() {
            try {
                if (!currentUser?.token || !hairdresser?.id) return;
                const data = await getFeedbackByHairdresser(hairdresser.id, currentUser.token);
                setFeedbacks(data);
            } catch (error) {
                console.error("Error al obtener los comentarios", error);
            }
        }

        if (hairdresser && currentUser?.token) {
            loadComentarios();
        }
    }, [currentUser, hairdresser]);

    const handleSubmit = () => {
        console.info(hairdresser)

        const feedbackData: FeedbackDTO = {
            id: '',
            rating,
            comment: comentario,
            clientId: currentUser?.user_id || '',
            hairdresserId: hairdresser.id,
        }


        createFeedback(feedbackData, currentUser?.token)
            .then(() => {
                alert('Comentario creado exitosamente')
                router.push('/comentarios')
            })
            .catch((e) => console.error(e))
    };

    const calculateAverage = () => {
        if (feedbacks.length === 0) return 0;
        const total = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
        return parseFloat((total / feedbacks.length).toFixed(1));
    };

    return (
        <div className="w-full p-7 space-y-4">
            <div className="p-5 flex justify-between items-center bg-gray-200 rounded-md">
                <span className="text-azulOscuro font-semibold text-lg">{hairdresser?.name || "Nombre no disponible"}</span>
                <span className="text-gray-800 font-medium">{hairdresser?.email || "Correo no disponible"}</span>
                <span className="flex items-center text-gray-800">
                    {calculateAverage()} <span className="text-rosadoOscuro ml-1">★</span>
                </span>
            </div>

            <div className="py-1 flex space-x-4">
                <div className="w-1/2 space-y-2">
                    <form className="bg-white p-4 rounded-md shadow">
                        <h1 className='text-azulOscuro py-2'>Agregar reseña</h1>
                        <textarea
                            onChange={(e) => setComentario(e.target.value)}
                            className="w-full h-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Escriba su comentario aquí"
                        ></textarea>

                        <div className='py-3 text-azulOscuro'>
                            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                                Seleccione una calificación
                            </label>
                            <select
                                id="rating"
                                value={rating}
                                onChange={(e) => setRating(parseInt(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring"
                            >
                                <option value={1}>1 ★</option>
                                <option value={2}>2 ★</option>
                                <option value={3}>3 ★</option>
                                <option value={4}>4 ★</option>
                                <option value={5}>5 ★</option>
                            </select>
                        </div>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-rosado text-white font-semibold px-4 py-2 rounded-md mt-2 hover:bg-rosadoOscuro"
                        >
                            Agregar
                        </button>
                    </form>
                </div>

                <div className="w-1/2 space-y-2">
                    <h1 className='text-azulOscuro'>Comentarios</h1>
                    {feedbacks.map((feedback, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-md shadow">
                            <div className="flex items-center space-x-1 text-rosadoOscuro">
                                {feedback.rating} <span>★</span>
                            </div>
                            <p className="text-gray-600 mt-1">
                               {feedback.comment}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
