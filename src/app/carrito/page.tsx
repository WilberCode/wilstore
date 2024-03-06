'use client' 
import { FormEvent, Fragment, Suspense, useContext, useEffect, useRef, useState } from "react" 
import Button from "../components/atoms/Button"
import { ArchiveBoxXMarkIcon, MinusCircleIcon, MinusIcon, PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline"
import { cartContext } from "../components/organisms/CartContext"
import axios from "axios"
import { Order, ProductProps } from "../../../typing" 
import ButtonLink from "../components/atoms/ButtonLink" 
import Form from "../components/organisms/Form" 


/* AdBlock */
const PageCart = () => {   
  const [products, setProducts] = useState([])
  const {cartProducts,addProduct, removeProduct,removeProductCart,clearCart} = useContext(cartContext)
  const [isSuccess, setIsSuccess] = useState(false)
    
  const [orders, setOrders] = useState<Order[]>([])
  useEffect(() => {
    axios.get('/api/orders').then((res) => setOrders(res.data) )
  }, [])

 
  useEffect(() => {
     if (cartProducts.length > 0) {
      axios.post('/api/cart',{ids:cartProducts}).then((res =>setProducts( res.data))) 
     } else{
      setProducts([]) 
      clearCart()
     } 
  }, [cartProducts])

  const removeProductOfCart = (id:string) =>{  
      removeProductCart(id)   
  }
  const moreOfThisProduct = (id:string) =>{   
      addProduct(id)
  }
  const lessOfThisProduct = (id:string) =>{   
      removeProduct(id)
    
  }
  

  let total =  0;
  
  for (const productId  of cartProducts) {
      const price = products.find(p => p._id === productId)?.price || 0
      total += price
  }




  let thRef = useRef(null)
  const setTextTd = (index:number)=>{
    return thRef?.current?.cells?.[index].innerText
  }
 
  
  useEffect(() => {
    let win =  window?.location?.href?.includes('success')
    setIsSuccess(win) 
    
    if (win) {
      setProducts([])
      clearCart()
      window.localStorage.removeItem('cart')
    }

  }, [])


  if (isSuccess) { 
    return (
      <div className="container">
         <div className="bg-blue-100 border border-blue-200  p-8 rounded-xl mt-8 ">
            <h2>Gracias por tu pedido!</h2>
            <p>Hemos enviado información a tu correo</p>
         </div>
      </div>
    )
  } 
  
  return  ( 
      <div  className="pt-8" >
      <div className="container">
      <div  className=" grid grid-cols-1 lg:grid-cols-[.7fr_.3fr] gap-4 " > 
      <Suspense  fallback={ <p>Cargando...</p> } >
        {products.length > 0?(
          <div  >
          <table  className="table table-cart bg-white">
            <thead>
            <tr ref={thRef} >
              <th>#</th>
              <th>Imagen</th>
              <th>Nombre del producto</th>
              <th>Cantidad</th>
              <th>Precio</th> 
              <th>Eliminar</th>
            </tr> 
            </thead>
            <tbody>
            { products.length > 0 && products?.map((product:ProductProps,index) =>( 
                 <tr key={product._id}>
                  <td className="max-sm:font-semibold" data-title={'Producto'}>#{index+1}</td>
                  <td data-title={setTextTd(1)} > <img className="w-full max-w-[80px]" src={product?.images[0]} alt="imagagen" /> </td>
                  <td data-title={setTextTd(2)} >{product?.name}</td>
                  <td data-title={setTextTd(3)} > <div  className="flex items-center" ><Button onClick={()=>lessOfThisProduct(product._id)} $primary $outline $md><MinusIcon/></Button> <span  className="px-2" >{ cartProducts?.filter(p=> p === product._id ).length}</span> <Button onClick={()=>moreOfThisProduct(product._id)} $primary $outline $md ><PlusIcon/></Button></div>  </td> 
                  <td data-title={setTextTd(4)} > <span className="whitespace-nowrap" >S/ { (cartProducts?.filter((p:string)=> p === product._id ).length * product.price)}</span> </td>
                  <td data-title={setTextTd(5)} > <Button onClick={()=>removeProductOfCart(product._id)} $default > <ArchiveBoxXMarkIcon/>  </Button> </td>
                </tr> 
              ))  }
               <tr> 
                    <td className="max-sm:!hidden" ></td>
                    <td className="max-sm:!hidden" ></td>
                    <td className="max-sm:!hidden" ></td>
                    <td className="max-sm:!hidden" ></td>
                    <td className="font-semibold whitespace-nowrap " data-title={'Precio total'}>S/ {total}</td>  
                    <td className="max-sm:!hidden" ></td>
               </tr>
            </tbody>
          </table>
        </div>
        ):(
          <div  className="rounded-lg bg-white text-center border border-gray-300  grid  place-items-center p-8 " >
            <div >
              <h2 className="mb-4">Tu carrito está vacio</h2>
              <ButtonLink $default href="/productos" >Agregar productos</ButtonLink>
            </div>
        </div>  
        )}
          </Suspense>
     
     
       <div>
         <div  className=" rounded-lg border bg-white border-blue-200 p-8" > 
            <h2 className="text-h3" >Información de compra</h2>
            
               {   orders.length  > 0 &&   <Form type={true} order={{...orders[0]}} products={products} cartProducts={cartProducts} />    } 
              
              { !(orders.length > 0)  &&  <Form type={true} order={[]} products={products} cartProducts={cartProducts} />}
          
         </div>
       </div>
     </div>
      </div>
   </div>  
  ) 
}

export default PageCart