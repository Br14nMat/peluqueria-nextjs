import { User } from '@/interface/user';
import axios from 'axios';
import { Service } from './services.service';

const BASE_URL = `${process.env.BACKEND_URL}/feedback`;

export interface Feedback {
    id: string;
    rating: number;
    comment: string;
    client: User;
    hairdresser: User;
}

export interface FeedbackDTO {
    id: string;
    rating: number;
    comment: string;
    clientId: string;
    hairdresserId: string;
}

export async function getFeedbacks(token?: string): Promise<Feedback[]> {

    const response = await axios.get<Feedback[]>(BASE_URL, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
    
    return response.data;
}


export async function getFeedbackByHairdresser(hairdresserId : string, token?: string): Promise<Feedback[]> {
    const response = await axios.get<Feedback[]>(`${BASE_URL}/hairdresser/${hairdresserId}`, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
    
    return response.data;
}

export async function getFeedbackById(id: string): Promise<Feedback> {
    const response = await axios.get<Feedback>(`${BASE_URL}/${id}`);
    return response.data;
}

export async function createFeedback(r: Omit<FeedbackDTO, 'id'>): Promise<FeedbackDTO> {
    const response = await axios.post<FeedbackDTO>(BASE_URL, r);
    return response.data;
}

export async function updateFeedback(id: string, service: Partial<Omit<Feedback, 'id'>>): Promise<Feedback> {
    const response = await axios.put<Feedback>(`${BASE_URL}/${id}`, service);
    return response.data;
}

export async function deleteFeedback(id: string, token?: string): Promise<void> {
    await axios.delete(`${BASE_URL}/${id}`, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
}