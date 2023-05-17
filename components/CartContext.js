import  { createContext, useState } from 'react'

export const CartContext = createContext({});

export function CartContextProvider({children}){
    const [cartProduct,setCartProduct] = useState([]);
    const addToCart = (id)=>{
        setCartProduct(prev=>[...prev,id])
    }
    return (
        <CartContext.Provider value={{cartProduct,setCartProduct,addToCart}}>
            {children}
        </CartContext.Provider>
    )
}
