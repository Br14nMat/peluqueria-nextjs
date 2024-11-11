import axios from 'axios';

const BASE_URL = `${process.env.BACKEND_URL}/service`;

export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    imgUrl: string;
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

export async function createService(service: Omit<Service, 'id'>, token?: string): Promise<Service> {
    const response = await axios.post<Service>(BASE_URL, service, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
    return response.data;
}

export async function updateService(id: string, service: Partial<Omit<Service, 'id'>>, token?: string): Promise<Service> {
    const response = await axios.patch<Service>(`${BASE_URL}/${id}`, service, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
    return response.data;
}


export async function deleteService(id: string, token?: string): Promise<Service> {
    const response = await axios.delete(`${BASE_URL}/${id}`, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
    return response.data;
}