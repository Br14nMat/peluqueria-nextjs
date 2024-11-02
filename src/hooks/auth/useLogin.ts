import Cookies from 'js-cookie'
import {AuthService} from "@/services/auth.service"

export const useLogin = () => {
    const login = async (email: string, password: string) => {
        const authService = new AuthService(process.env.BACKEND_URL || '');
        const user = await authService.login(email, password)
        if(user){
            Cookies.set('currentUser', JSON.stringify(user)); 
        }

        return user;
    }

    return {login}
}