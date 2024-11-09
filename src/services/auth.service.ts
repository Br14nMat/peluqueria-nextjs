import axios, { AxiosInstance } from 'axios';

export class AuthService {
    protected readonly axios: AxiosInstance; 

    public constructor(url?: string) {
        this.axios = axios.create({
            baseURL: url || process.env.NEXT_PUBLIC_BACKEND_URL,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            withCredentials: true,
            timeout: 5000
        });

        this.axios.interceptors.response.use(
            response => response,
            error => {
                console.error('Error en la petición:', error.response?.data || error.message);
                throw error;
            }
        );
    }

    public async login(email: string, password: string): Promise<any> {
        try {
            const response = await this.axios.post('/api/auth/login', { email, password });
            return response.data;
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    }

    public async register(name: string, email: string, password: string): Promise<any> {
        try {
            const response = await this.axios.post('/api/auth/register', { name, email, password });
            return response.data;
        } catch (error) {
            console.error('Error en registro:', error);
            throw error;
        }
    }
}