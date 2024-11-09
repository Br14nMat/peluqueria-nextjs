import Cookies from 'js-cookie'
import { AuthService } from "@/services/auth.service"

export const useLogin = () => {
    const login = async (email: string, password: string) => {
        try {
            // Usar la variable de entorno correctamente
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
            const authService = new AuthService(backendUrl);
            
            const user = await authService.login(email, password);
            
            if (!user) {
                throw new Error('No se recibieron datos del usuario');
            }

            // Guardar en cookies con opciones de seguridad
            Cookies.set('currentUser', JSON.stringify(user), {
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                expires: 7 // 7 días
            }); 

            return user;
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    }

    return { login }
}