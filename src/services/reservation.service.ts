import { User } from '@/interface/user';
import axios from 'axios';
import { Service } from './services.service';

const BASE_URL = `${process.env.BACKEND_URL}/reservation`;

export interface Reservation {
    id: string;
    reservationDate: Date;
    serviceDate: Date;
    status: string;
    hairdresserId: string;
    serviceId: string;
    clientId: string;
}

export interface ReservationDTO {
    id: string;
    reservationDate: Date;
    serviceDate: Date;
    status: string;
    hairdresser: User;
    service: Service;
    client: User
}
  

export async function getReservations(token?: string): Promise<ReservationDTO[]> {

    const response = await axios.get<ReservationDTO[]>(BASE_URL, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
    
    return response.data;
}


export async function getReservationsByClient(clientId : string, token?: string): Promise<ReservationDTO[]> {
    console.log(clientId)
    const response = await axios.get<ReservationDTO[]>(`${BASE_URL}/client/${clientId}`, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
    
    return response.data;
}

export async function getReservationById(id: string): Promise<ReservationDTO> {
    const response = await axios.get<ReservationDTO>(`${BASE_URL}/${id}`);
    return response.data;
}

export async function createReservation(r: Omit<Reservation, 'id'>): Promise<Reservation> {
    const response = await axios.post<Reservation>(BASE_URL, r);
    return response.data;
}

export async function updateReservation(id: string, service: Partial<Omit<Reservation, 'id'>>): Promise<Reservation> {
    const response = await axios.put<Reservation>(`${BASE_URL}/${id}`, service);
    return response.data;
}

export async function deleteReservation(id: string, token?: string): Promise<void> {
    await axios.delete(`${BASE_URL}/${id}`, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
}