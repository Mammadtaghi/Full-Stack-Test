import { createContext, useContext } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";


const userContext = createContext()

export const UserProvider = ({ children }) => {

    const [user, setUser] = useLocalStorage('user', { username: '', role: '', basket: [], wishlist: [], token: '' })


    // Basket

    async function AddToBasket(item) {
        let BasketCopy = user.basket
        const itemIndex = BasketCopy.findIndex(x => x._id === item._id)
        if (itemIndex === -1) {
            item.count = 1
            BasketCopy.push(item)
            user.basket = BasketCopy
            localStorage.setItem('user', JSON.stringify(user))
            console.log(BasketCopy);
            return
        }
        BasketCopy[itemIndex].count++
        user.basket = BasketCopy
        localStorage.setItem('user', JSON.stringify(user))
        console.log(BasketCopy);
    }

    // Wishlist

    async function AddToWishlist(item) {
        let WishlistCopy = user.wishlist
        const itemIndex = WishlistCopy.findIndex(x => x._id === item._id)
        if (itemIndex === -1) {
            item.count = 1
            WishlistCopy.push(item)
            user.wishlist = WishlistCopy
            localStorage.setItem('user', JSON.stringify(user))
            console.log(WishlistCopy);
            return
        }
        WishlistCopy[itemIndex].count++
        user.wishlist = WishlistCopy
        localStorage.setItem('user', JSON.stringify(user))
        console.log(WishlistCopy);
    }

    function isInWishlist(item) {
        const WislistCopy = user.wishlist
        const Found = WislistCopy.find(x=> x.id === item.id)
        return Found ? true : false
    }


    // Data

    const data = {
        user: user,
        setUser: setUser,
        AddToBasket,
        AddToWishlist,
        isInWishlist,
    }

    return (
        <userContext.Provider value={data}>
            {children}
        </userContext.Provider>
    )

}

export const useUser = () => useContext(userContext)
