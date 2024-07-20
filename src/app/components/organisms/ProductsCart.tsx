'use client'

import { useEffect, useState } from "react" 
import { ProductProps } from "../../../../typing"

 
const ProductsCart = () => {
    const ls = typeof window !== "undefined" ?  window.localStorage : null

    const [cartProducts, setCartProducts] = useState([])
  
    useEffect(() => {
      if (ls && ls?.getItem('cart')) {
        setCartProducts(JSON.parse(ls?.getItem('cart')!))  
      }
    }, [])
  
  return (
    <div  className="grid grid-cols-[.7fr_.3fr] gap-4 " >
    <div>
      <table  className="table">
        <thead>
        <tr>
          <th>wss</th>
        </tr> 
        </thead>
        <tbody>
          {cartProducts.map((product:ProductProps) =>(
            <tr key={product._id} >
              <td>{product?.name}</td>
            </tr>
          )) } 
        </tbody>
      </table>
    </div>
    <div>
      swqs
    </div>
  </div>
  )
}

export default ProductsCart