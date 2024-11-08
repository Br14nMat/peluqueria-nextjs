import axios, {AxiosInstance} from 'axios';

export class AuthService{
    protected readonly axios: AxiosInstance; 

    public constructor(url?: string){
        this.axios = axios.create({
            baseURL: url || process.env.BACKEND_URL, 
            headers: {
                'Content-Type': 'application/json'
            }, 
            timeout: 3000
        })
    }

    public async login(email: string, password: string): Promise<any> {
        const response = await this.axios.post('/auth/login', {email, password});
        return response.data;
    }


    public async register(name: string, email: string, password: string): Promise<any> {
        const response = await this.axios.post('/auth/register', {name, email, password});
        return response.data;
    }
}