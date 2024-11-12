import axios from 'axios';

const BASE_URL = `${process.env.BACKEND_URL}/auth`;

export interface IUser {
    id: string;
    email: string; 
    name: string;
    token: string;
    roles: string[];
}

export async function registerByAdmin(name: string, email: string, password: string, roles: string [], token?: string): Promise<IUser> {

    const response = await axios.post<IUser>(`${BASE_URL}/admin/register`, {name, email, password, roles},
        {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
    
    return response.data;
}


export async function getHaidressers(token?: string): Promise<IUser[]> {

    const response = await axios.get<IUser[]>(`${BASE_URL}/hairdressers`, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
    
    return response.data;
}


export async function getClients(token?: string): Promise<IUser[]> {

    const response = await axios.get<IUser[]>(`${BASE_URL}/clients`, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
    
    return response.data;
}

export async function getAllUsers(): Promise<IUser[]> {

    const response = await axios.get<IUser[]>(`${BASE_URL}/all`);
    
    return response.data;
}


