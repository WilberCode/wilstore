'use client'
import { CheckBadgeIcon, CheckCircleIcon, MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"  
import ButtonLink from "../atoms/ButtonLink"
import ReactDOM from 'react-dom'
import { ProductProps } from "../../../../typing"
import Button from "../atoms/Button"
import { useContext } from "react"
import { cartContext } from "./CartContext"

 type CartModalProps = {
    isOpen?:boolean;
    setModal?:(data:boolean)=> void;
    product?:ProductProps;
 }
const CartModal = ({isOpen,setModal,product}:CartModalProps) => { 
  if ( !isOpen || typeof document === 'undefined') {
    return ; // No renderizar nada si el modal no está abierto o si no está en el navegador
  }

    const {cartProducts,addProduct, removeProduct,removeProductCart,clearCart} = useContext(cartContext)
   const moreOfThisProduct = (id:string) =>{   
      addProduct(id)
  }
  const lessOfThisProduct = (id:string) =>{    
      removeProduct(id)  
  }
  if (cartProducts.length===0 ) {
    setModal(false)
 } 
  return ReactDOM.createPortal(
    <div  className=" modal-cart w-full h-full fixed  flex justify-center  items-start sm:items-center z-20 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 " >
        <div className="rounded-lg  bg-white w-full max-w-[700px] overflow-hidden max-sm:mt-8 " >
          <div className="flex justify-between items-center py-2 px-6" >
             <div  className="flex items-center space-x-3 " >
                <CheckCircleIcon  className="w-8 text-green-600 " />
                <span  >Lo que llevas en tu Carrito</span>
             </div>
             <button onClick={()=>setModal(false)} >
                <XMarkIcon  className="w-5 text-gray-400"/>
             </button> 
          </div> 
          <hr className=" mx-4 sm:mx-6 border-gray-200 " />
          <div className="py-3 px-4 sm:px-6" >
            <div  className="flex  gap-4 items-start" >
              <div>
               <img className="w-[100px] sm:w-full max-w-[130px]" src={product?.images[0]} alt="" />
              </div>
              <div  className="flex max-sm:flex-wrap items-start max-sm:gap-y-3" >
                <div>
                  <h3 className=" text-sm font-normal " >{product?.name}</h3> 
                </div>
                <div  className="w-full max-w-[110px]" > 
                  <var className="not-italic whitespace-nowrap " >S/. {product?.price}</var>
                </div>
                <div  className="flex-grow flex items-center" > 
                  <div  className="flex items-center" ><Button onClick={()=>lessOfThisProduct(product?._id)} $primary $outline $md><MinusIcon/></Button> <span  className="px-2" >{ cartProducts?.filter(p=> p === product?._id ).length}</span> <Button onClick={()=>moreOfThisProduct(product?._id)} $primary $outline $md ><PlusIcon/></Button></div> 
                  <span className="text-xs whitespace-nowrap ml-2 text-gray-500 " >Máximo 24 unidades</span>
                </div>
              </div>
            </div>
          </div> 
          <div className="flex justify-end py-3 bg-gray-50  px-6" >
            <div>
                <button className="border-b border-gray-800 mr-6 text-sm "  onClick={()=>setModal(false)}  >Siguir comprando</button> 
                <ButtonLink  $default $md href="/carrito" >Ir al Carrito</ButtonLink> 
            </div> 
          </div>
        </div>
    </div>,document.body
  )
  
}

export default CartModal