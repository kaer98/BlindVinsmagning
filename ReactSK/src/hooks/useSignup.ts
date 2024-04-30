import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface SignupParams {
  fullname: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
  birthday: string;
}

interface SignupResponse {
  error: string;
  fullname: string;
  id: number;

}

const useSignup = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputErrors = (params: SignupParams): boolean => {
    const { fullname, username, password, confirmPassword, gender, birthday } = params;

    if (!fullname || !username || !password || !confirmPassword || !gender || !birthday) {
      toast.error("Alle felter skal udfyldes!");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Adgangskoderne matcher ikke.");
      return false;
    }

    if (password.length < 6) {
      toast.error("Adgangskoden skal mindst være 6 tegn lang!");
      return false;
    }

    return true;
  };

  const signup = async (params: SignupParams): Promise<void> => {
    const success = handleInputErrors(params);
    if (!success) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://vin.jazper.dk/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });

      const data: SignupResponse = await response.json();
      console.log(data);
      
      if (response.ok) {
          toast.success(` Tillykke, ${data.fullname}! din bruger med id ${data.id} er oprettet.`);
        } else {
          toast.error(data.error);
        }
   

    } catch (error) {
      toast.error("Fejl ved oprettelse af bruger.");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;
