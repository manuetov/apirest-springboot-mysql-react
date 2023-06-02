import React, { useContext } from "react";
import { useAuth } from "../auth/hooks/useAuth";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    
    const { login, handlerLogin, handlerLogout } = useAuth();

    return (
        <AuthContext.Provider value={
            {
                login,
                handlerLogin,
                handlerLogout
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
   return useContext(AuthContext)
}