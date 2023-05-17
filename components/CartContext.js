import  { createContext, useEffect, useState } from 'react'

export const CartContext = createContext({});

export function CartContextProvider({children}){
    const ls = typeof window !== 'undefined' ? window.localStorage : null;
    const defaultProducts = ls ? JSON.parse(ls?.getItem('cart')) : [];
    const [cartProduct,setCartProduct] = useState([]);
    const addToCart = (id)=>{
        setCartProduct(prev=>[...prev,id])
    }

    const removeProduct = (id)=>{
        setCartProduct(prev=>{
            const pos = prev.indexOf(id);
            if (pos !== -1){
                return prev.filter((value,index)=>index !== pos)
            }
            return prev;
        })
    }

    useEffect(()=>{
        if(cartProduct?.length > 0){
            ls?.setItem('cart',JSON.stringify(cartProduct));
        }
    },[cartProduct])

    useEffect(()=>{
        if(ls && ls.getItem('cart')){
            setCartProduct(JSON.parse(ls.getItem('cart')));
        }
    },[])
    return (
        <CartContext.Provider value={{cartProduct,setCartProduct,addToCart,removeProduct}}>
            {children}
        </CartContext.Provider>
    )
}
