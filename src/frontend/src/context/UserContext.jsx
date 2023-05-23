import React, { createContext, useContext } from "react";
import { useUsers } from "../hooks/useUsers";

const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const {
        // atributos o propiedades
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        errors,
        // funciones
        handlerAddUsers,
        handlerRemoveUsers,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getUsers
    } = useUsers();

    return (
        <UserContext.Provider value={
            {
                users,
                userSelected,
                initialUserForm,
                visibleForm,
                errors,
                handlerAddUsers,
                handlerRemoveUsers,
                handlerUserSelectedForm,
                handlerOpenForm,
                handlerCloseForm,
                getUsers,
            }
        }>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext)
}

