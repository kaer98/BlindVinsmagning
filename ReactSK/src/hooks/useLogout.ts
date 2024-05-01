import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const useLogout = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext();

    const jwtToken = Cookies.get("jwt");

    const logout = async () => {
        setLoading(true)

        try {
            const res = await fetch("http://localhost:3000/api/auth/logout", {

                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include'
            });

            const data = await res.json()
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.removeItem("chat-user");
            setAuthUser(null);
        } catch (error) {
            toast.error(error.message);
            console.log("COOKIE: ", jwtToken);

        } finally {
            setLoading(false);
        }

    }

    return { loading, logout };
}

export default useLogout