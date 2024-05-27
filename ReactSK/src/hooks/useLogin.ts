import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

// Define the expected shape of login credentials
interface LoginCredentials {
    username: string;
    password: string;
}

interface LoginResult {
    id?: number;
    fullname?: string;
    error?: string;
}

export const useLogin = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const { setAuthUser } = useAuthContext();

    const login = async ({ username, password }: LoginCredentials): Promise<void> => {
        const success = handleInputErrors({ username, password });
        if (!success) return;

        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data: LoginResult = await res.json();

            if ('error' in data) {
                throw new Error(data.error);
            }
            toast.success(`Du er nu logget ind, ${data.fullname}`);


            //localstorage
            //Data er det objekt der bliver returneret fra backenden.
            localStorage.setItem("authUser", JSON.stringify(data));

            //Derefter skal contexten opdateres.
            //context
            setAuthUser(data);

        } catch (error) {

            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("En uventet fejl.. Ayo");
            }
        } finally {

            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;


function handleInputErrors({ username, password }: LoginCredentials): boolean {
    if (!username || !password) {
        toast.error("Du skal udfylde alle felterne.");
        return false;
    }

    return true;
}
