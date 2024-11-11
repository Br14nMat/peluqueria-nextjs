"use client";
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';
import { createFeedback, Feedback, FeedbackDTO, getFeedbackByHairdresser } from '@/services/feedback.service';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { addFeedback, fetchFeedbackByHairdresser } from '@/store/feedback/feedbackSlice';

export default function Comentarios() {
    const { user: currentUser } = useCurrentUser();
    const dispatch = useAppDispatch();

    const feedbacks = useAppSelector((state) => state.feedbacks.list);
    
    const hairdresser = useAppSelector((state) => state.users.selectedHairdresser);

    useEffect(() => {
        async function loadComentarios() {
            try {
                if (!currentUser?.token || !hairdresser?.id) return;
                dispatch(fetchFeedbackByHairdresser({ hairdresserId: hairdresser.id, token: currentUser.token }));
            } catch (error) {
                console.error("Error al obtener los comentarios", error);
            }
        }

        if (hairdresser && currentUser?.token) {
            loadComentarios();
        }
    }, [currentUser, hairdresser, dispatch]);



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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                <h1 className="text-azulOscuro md:col-span-2">Comentarios</h1>
                <div className="max-h-96 overflow-y-auto space-y-2 md:col-span-2">
                    {feedbacks.length === 0 ? (
                        <p className="text-center text-gray-500">No hay comentarios disponibles.</p>
                    ) : (
                        feedbacks.map((feedback, index) => (
                            <div key={index} className="bg-gray-100 p-4 rounded-md shadow">
                                <div className="flex items-center space-x-1 text-rosadoOscuro">
                                    {feedback.rating} <span>★</span>
                                </div>
                                <p className="text-black mt-1">
                                    {feedback.client.name}:
                                </p>
                                <p className="text-gray-600 mt-1">
                                    {feedback.comment}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}