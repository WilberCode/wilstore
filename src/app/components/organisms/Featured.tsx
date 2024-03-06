 'use client'
 
import Button from "../atoms/Button";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";  
import { ProductProps } from "../../../../typing";
import ButtonLink from "../atoms/ButtonLink"; 
import { useContext } from "react";
import { cartContext } from "./CartContext";
 
type Props = {
  product: ProductProps
}
const Featured =   ({product}:Props) => { 
  const {addProduct} = useContext(cartContext)
  const addFeaturedProduct =  ()=>{
    addProduct(product._id)
  }
  return (
    <section  className="bg-blue-600" >  
       <div className="container">
        <div className="  py-12 grid md:grid-cols-[0.6fr_0.4fr] gap-10 ">
            <div className="text-white flex   items-center " > 
             <div>
              <h1 className=" text-2xl sm:text-3xl lg:text-4xl" >{product.name}</h1> 
                <p  className="mt-6 mb-5 max-w-[450px] " >{product.description} </p>
                <div className="inline-flex gap-3 " >  
                  <ButtonLink href={'/productos/producto/'+product._id} $outline $white >Leer más</ButtonLink>
                  <Button onClick={addFeaturedProduct}  $white> <ShoppingCartIcon/> Agregar al Carrito</Button>   
                </div>
             </div>
           </div>
          <div  className="max-md:row-start-1 " >
            <img className="rounded-lg" src={product.images[0]} alt="" />
          </div>

        </div>
       </div> 
    </section>
  )
}

export default Featured
 