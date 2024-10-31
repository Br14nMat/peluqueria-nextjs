import { useEffect, useState } from "react";
import Cookies from 'js-cookie'; 
import { AuthService } from "@/services/auth.service";
import { User } from "@/interface/user";

export const useCurrentUser = () => {
    const [user, setCurrentUser] = useState<User | null>(null); 

    useEffect(() => {
        const userCookie = Cookies.get('currentUser');
        
        if (userCookie) {
            try {
                const parsedUser = JSON.parse(userCookie) as User;
                setCurrentUser(parsedUser);
            } catch (error) {
                console.error("Error parsing user cookie:");
            }
        }
    }, []);

    return { user };
};