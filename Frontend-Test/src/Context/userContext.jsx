import { createContext, useContext, useState } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";


const userContext = createContext()

export const UserProvider = ({children}) =>{

    const [user, setUser] = useLocalStorage('user',{username:'', role:'',token:''})

    const data = {
        user:user,
        setUser:setUser,
    }

    return(
        <userContext.Provider value={data}>
            {children}
        </userContext.Provider>
    )

}

export const useUser=()=>useContext(userContext)
