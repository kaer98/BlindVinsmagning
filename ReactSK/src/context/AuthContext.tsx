import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface AuthContextProviderProps {
    children: ReactNode;
}

interface AuthContextType {
    authUser: any; //Om til Interface senere
    setAuthUser: Dispatch<SetStateAction<any>>; //Også her
}

// Initialize the context with a default value of `undefined` or the expected shape
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps): JSX.Element => {
    const [authUser, setAuthUser] = useState<any>(JSON.parse(localStorage.getItem("authUser") || "null"));

    const value = { authUser, setAuthUser };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
