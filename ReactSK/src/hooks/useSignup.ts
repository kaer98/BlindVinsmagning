import React, { useState } from 'react';
import toast from 'react-hot-toast';

// Type definition for signup parameters
interface SignupParams {
  fullname: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
  birthday: string;
}

// Type definition for signup response (example, customize as needed)
interface SignupResponse {
  success: boolean;
  message: string;
}

const useSignup = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputErrors = ({ fullname: fullname, username, password, confirmPassword, gender, birthday }: SignupParams): boolean => {
    if (!fullname || !username || !password || !confirmPassword || !gender || !birthday) {
      toast.error("Alle felter skal udfyldes!");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Adgangskoderne matcher ikke.");
      return false;
    }

    if (password.length < 6) {
      toast.error("Adgangskoden skal mindst være 6 lang!");
      return false;
    }

    return true;
  };

  const signup = async (params: SignupParams): Promise<void> => {
    console.log(params)
    const success = handleInputErrors(params);
    if (!success) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      const data: SignupResponse = await response.json();

      if (data.success) {
        toast.success("Tillykke! Din bruger er blevet oprettet.");
      } else {
        toast.error(data.message || "Server Fejl: Din bruger blev ikke oprettet");
      }

    } catch (error) {
      toast.error("Fejl ved oprettelse af bruger.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;
