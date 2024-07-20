'use client'
import { useContext, useState } from "react"
import Button from "../atoms/Button"
import { cartContext } from "../organisms/CartContext"
import {  ShoppingCartIcon } from "@heroicons/react/24/outline"
import CartModal from "../organisms/CartModal"
import { CartContextType } from "../../../../typing"

 
const SingleProductContent = ({product}:any) => {
 
    
  const {cartProducts,addProduct } = useContext(cartContext)  as CartContextType
  const [modal, setModal] = useState(false)

/*   const hangler = ()=>{
    
  } */
  const addToCart = (id:string)=>{
    addProduct(id)
    setModal(true)
  }
  return (
    <div className=" " > 
            
        <h1  className="mt-4 md:mt-12 leading-tight " >{product?.name}</h1>
        <p  className="mt-4 leading-relaxed " >{product.description}</p> 
        <div  className="mt-3">
        <var className="text-3xl inline-flex  font-semibold not-italic " >S/ {product.price} </var>
        </div>
        
        <div className="mt-8">
        <Button $primary $default onClick={()=>addToCart(product?._id)} > <ShoppingCartIcon/> Agregar al carrito</Button> 
        </div>
          <CartModal isOpen={modal} setModal= {setModal} product={product} />  

    </div>
  )
}

export default SingleProductContent