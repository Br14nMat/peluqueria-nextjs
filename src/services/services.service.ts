import axios from 'axios';

const BACKEND_URL = "https://peluqueria-nest-app.onrender.com"

const BASE_URL = `${process.env.BACKEND_URL || BACKEND_URL }/service`;

export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
}

export async function getServices(token?: string): Promise<Service[]> {

    const response = await axios.get<Service[]>(BASE_URL, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
    
    return response.data;
}

export async function getServiceById(id: string): Promise<Service> {
    const response = await axios.get<Service>(`${BASE_URL}/${id}`);
    return response.data;
}

export async function createService(service: Omit<Service, 'id'>): Promise<Service> {
    const response = await axios.post<Service>(BASE_URL, service);
    return response.data;
}

export async function updateService(id: string, service: Partial<Omit<Service, 'id'>>): Promise<Service> {
    const response = await axios.put<Service>(`${BASE_URL}/${id}`, service);
    return response.data;
}

export async function deleteService(id: string): Promise<void> {
    await axios.delete(`${BASE_URL}/${id}`);
}
