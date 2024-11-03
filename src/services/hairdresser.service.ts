import { User } from '@/interface/user';
import axios from 'axios';

const BASE_URL = `${process.env.BACKEND_URL}/auth/hairdressers`;


export async function getHaidressers(token?: string): Promise<User[]> {

    const response = await axios.get<User[]>(BASE_URL, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
    
    return response.data;
}

export async function getHaidresserById(id: string): Promise<User> {
    const response = await axios.get<User>(`${BASE_URL}/${id}`);
    return response.data;
}

export async function createHaidresser(service: Omit<User, 'id'>): Promise<User> {
    const response = await axios.post<User>(BASE_URL, service);
    return response.data;
}

export async function updateHaidresser(id: string, service: Partial<Omit<User, 'id'>>): Promise<User> {
    const response = await axios.put<User>(`${BASE_URL}/${id}`, service);
    return response.data;
}

export async function deleteHaidresser(id: string): Promise<void> {
    await axios.delete(`${BASE_URL}/${id}`);
}
