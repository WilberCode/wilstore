 
'use client'

import { ShoppingCartIcon } from "@heroicons/react/20/solid"
import Button from "./Button"

const FeaturedAddToCart = () => {
  const addToCart =  (id:string)=>{
    console.log(id,'sws');
    
   }
  return (
    <Button onClick={addToCart}  $white> <ShoppingCartIcon/> Agregar al Carrito</Button>  
  )
}

export default FeaturedAddToCart