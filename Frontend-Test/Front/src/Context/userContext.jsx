import { createContext, useContext } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";


const userContext = createContext()

export const UserProvider = ({children}) =>{

    const [user, setUser] = useLocalStorage('user',{username:'', role:'',basket:null,wishlist:null,token:''})

    // Basket

    async function AddToBasket(item) {
        let BasketCopy = user.basket
        BasketCopy
    }

    // Wishlist



    // Data

    const data = {
        user:user,
        setUser:setUser,
        AddToBasket,

    }

    return(
        <userContext.Provider value={data}>
            {children}
        </userContext.Provider>
    )

}

export const useUser=()=>useContext(userContext)
