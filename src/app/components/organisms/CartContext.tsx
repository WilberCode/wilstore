"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext({});

const CartContext = ({ children }: any) => {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
 
 
  useEffect(() => {
    if (cartProducts?.length>0) { 
      ls?.setItem('cart',JSON.stringify(cartProducts))
    } 
  
  }, [cartProducts])

  useEffect(() => {
    if (ls && ls?.getItem('cart')) {
      setCartProducts(JSON.parse(ls?.getItem('cart')!))  
    }
  }, [])

  const addProduct = (productId: never) => {  
      setCartProducts([...cartProducts, productId]); 
  };
 

  const removeProduct = (productId:never) =>{    
    if(cartProducts.length === 1 && ls && ls?.getItem('cart')){ 
      const cart:any = []
      ls?.setItem('cart',JSON.stringify(cart)) 
      setCartProducts([])  
    }
    if (cartProducts.length===0) return null  
    setCartProducts(prev=>{   
      const  index = prev.indexOf(productId)  
      prev.splice(index,1) 
      return [...prev] 
    }) 

 }
 const clearCart = ()=>{ 
  setCartProducts([])
 }

 const removeProductCart = (productId:string) =>{  
  
  
  if(ls?.getItem('cart') && (cartProducts.length === 1 || cartProducts?.every(Id=> Id===productId) )    ){ 
    const cart:any = []
    ls?.setItem('cart',JSON.stringify(cart)) 
    setCartProducts([]) 
   
  } else {
    if (cartProducts.length===0) return null 
    setCartProducts(prev=>{    
      return [...prev].filter(Id => Id !== productId)
    }) 
  } 
 } 


  return (
    <cartContext.Provider value={{ cartProducts, setCartProducts,addProduct, removeProduct,removeProductCart,clearCart}}>
      {children}
    </cartContext.Provider>
  );
};

export default CartContext;
