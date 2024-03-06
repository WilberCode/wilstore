'use client' 
import { FormEvent, Fragment, Suspense, useContext, useEffect, useRef, useState } from "react"  
import axios from "axios"
import { Order, ProductProps, WishlistProps } from "../../../typing" 
import Link from "next/link"
import Box from "../components/organisms/Box"
import Form from "../components/organisms/Form"
import Time from "../components/atoms/Time"
import Button from "../components/atoms/Button"
import Product from "../components/molecules/Product"  
import isLogin from "../../../utils/isLogin" 
/* AdBlock */
const pageAccount = () => {    
  const session = isLogin() 
 /*  const dsw =  
  if (!isLogin()) return; */

  const [orders, setOrders] = useState<Order[]>([])
  const [wishlistProducts, setWishlistProducts] = useState<WishlistProps>() 
  console.log(orders);
  
  useEffect(() => {  
      axios.get('/api/orders').then((res) => setOrders(res.data)) 
  }, [])
  useEffect(() => {    
       axios.get('/api/wishlist',{params:{userEmail:session?.user?.email}}).then((res) => setWishlistProducts(res.data))   
  }, [wishlistProducts])
  

  const getTotal = (lineItems:any)=>{
    let total =  0;
    

    for (const line  of lineItems) {
        const price = line.quantity * line.price_data.unit_amount
        total += price
    }
    return total / 100
  }   


  const [menu, setMenu] = useState(true) 
  const toggleMenu = (status: boolean) =>{
    return  <li> <Button $default $md className={status ==menu?' border-b border-black ':'opacity-50 hover:opacity-100 '} onClick={()=>setMenu(status)} > {status?'Pedidos':'Lista de deseos'}</Button> </li>
  }
  return  ( 
      <div  className="pt-8" >
      <div className="container"> 
      <div  className=" grid grid-cols-1 lg:grid-cols-[.7fr_.3fr] gap-4 ">
        <Box>
            <ul  className="flex gap-2 " >
             {toggleMenu(true) }
             {toggleMenu(false)} 
            </ul>
            <div  className="mt-6">
              {menu?(
                <div  className="border border-gray-200 rounded-lg " >
                <div className="grid grid-cols-4 py-2 px-3 text-sm " >
                    <strong> Fecha </strong>
                    <strong> Cliente</strong>
                    <strong> Total </strong>
                    <strong> Correo </strong>
                </div> 
                {orders?.map((order) =>(
                  <Link key={order._id} href={'/pedidos/'+order._id} className="grid grid-cols-4 border-t border-gray-200 py-3 text-sm hover:bg-blue-50 px-3  " >
                    <div> <Time date={order.createdAt} />  </div>
                    <div> {order.name} </div> 
                    <div> S/. {getTotal(order.line_items)} </div>
                    <div> {order.email} </div>
                  </Link>
                ))} 
                </div>
              ):(
                <div>
                  {
                     wishlistProducts?.products?.length > 0 && (
                      <div className="grid grid-cols-2 gap-8 p-6 bg-gray-100 rounded-lg ">
                      {wishlistProducts?.products?.map(((p:ProductProps)=>        <Product key={p._id} {...p} />  ))}
                    </div>
                     )
                  }
                

                </div>
              )}
            </div>
           
        </Box>   
       <div> 
          <Box className="px-8 py-4" > 
              <h2 className="text-h3" >Información de compra</h2>
               {/*  {orders?.length > 0 && <Form order={orders[0]}/>} */}
              {  orders.length > 0  &&<Form order={orders[0]}/>}
              { !(orders.length > 0)  &&<Form order={[]}/>}
          </Box> 
       </div>
     </div>
      </div>
   </div>  
  ) 
}

export default pageAccount