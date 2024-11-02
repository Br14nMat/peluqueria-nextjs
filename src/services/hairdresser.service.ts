import axios from 'axios';

const BASE_URL = `${process.env.BACKEND_URL}/auth/hairdressers`;

export interface Haidresser {
    id: string;
    name: string;
    email: string;
}

export async function getHaidressers(token?: string): Promise<Haidresser[]> {

    const response = await axios.get<Haidresser[]>(BASE_URL, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
    
    return response.data;
}

export async function getHaidresserById(id: string): Promise<Haidresser> {
    const response = await axios.get<Haidresser>(`${BASE_URL}/${id}`);
    return response.data;
}

export async function createHaidresser(service: Omit<Haidresser, 'id'>): Promise<Haidresser> {
    const response = await axios.post<Haidresser>(BASE_URL, service);
    return response.data;
}

export async function updateHaidresser(id: string, service: Partial<Omit<Haidresser, 'id'>>): Promise<Haidresser> {
    const response = await axios.put<Haidresser>(`${BASE_URL}/${id}`, service);
    return response.data;
}

export async function deleteHaidresser(id: string): Promise<void> {
    await axios.delete(`${BASE_URL}/${id}`);
}
