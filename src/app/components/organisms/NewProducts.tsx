'use client'
import { useEffect, useState } from "react"
import { ProductProps } from "../../../../typing" 
import Product from "../molecules/Product"
import axios from "axios"
import useWishlist from "../../../../hooks/useWishlist"
import CartModal from "./CartModal"

type Props = {
    products:ProductProps[] 
}
const NewProducts = ({products}:Props) => {   
  const {wl} =  useWishlist() 
  return (
    <section  className="bg-blue-100 py-[50px]" > 
       <div className="container"> 
        <h2>Productos recientes</h2>
    {/*     {JSON.stringify(wishlist)} */}
        {!!products && ( 
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6" >
            {products.map((product:ProductProps)=> (<Product key={product._id} {...product}  {...wl}  />)  )}
               
        </div>
       )}
       </div>  
     </section>
  )
}

export default NewProducts