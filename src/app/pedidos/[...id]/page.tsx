import Box from "@/app/components/organisms/Box"
import mongooseConnect from "../../../../lib/mongoose"
import { Order } from "../../../../models/Order"
import { Order as orderProps, queryProps } from "../../../../typing"
import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/24/outline"
import Time from "@/app/components/atoms/Time"
import { Suspense } from "react" 
import { isLogin } from "../../../../pages/api/auth/[...nextauth]" 
import { redirect } from "next/navigation"
const pageOrder = async({params:{id}}:queryProps) => { 
  const session =  await isLogin()
  await mongooseConnect()
  let order = null;
  try {
    order = await Order.findById({_id:id})  
  } catch (error) {
    return redirect('/cuenta') ;
  } 
  let quantity = 0, total = 0, delivery =  10 
 
  return (
    <div  className="pt-8" >
    <div className="container">
    <div  className=" grid grid-cols-1 lg:grid-cols-[.7fr_.3fr] gap-4 " >
      <div>
        <Box>
         <Suspense fallback={<p>Loading feed...</p>}>
            <div className="border border-gray-200 rounded-lg " >
                  <div className="py-2 px-3 text-sm "> 
                    <h6  className="text-sm" >Fecha de pedido</h6>
                     <Time date={order.createdAt}/>  
                  </div>
                  <ul>
                 

                  {
                    order?.line_items?.map((line:any,index:number) =>(
                      <li key={index} className="grid grid-[templates_area] grid-cols-[6fr_minmax(5.625rem,_auto)_minmax(5rem,_auto)] gap-6 py-3 px-3 border-t border-gray-200 text-sm  text-left " >
                        <div> {line?.price_data?.product_data?.name} </div> 
                        <div> S/. {line?.price_data?.unit_amount/100}&nbsp;&nbsp;{'  x  '}&nbsp;&nbsp;{line.quantity} </div> 
                        <div> S/. {(line?.price_data?.unit_amount/100)*(line.quantity)} </div>  
                      </li>
                    )) 
                  } 
                  </ul>
            
            </div> 
         </Suspense>
        </Box>  
        <Box  className="mt-8" >
            <div className="bg-gray-200 px-2 py-1 rounded-md inline-flex text-sm space-x-1  ">{order.paid? ( <><CheckBadgeIcon className="w-5"/><span>Pagado</span></>):( <><XCircleIcon className="w-5"/><span>No pagado</span></>)}</div>     
            <div className="border border-gray-200 rounded-lg p-3 mt-2">
                <ul  className="text-sm  space-y-2 " >
                  <li className="grid grid-cols-3 gap-2 ">
                     <span>Subtotal</span> 
                     <span> {  order?.line_items?.map((line:any)=> { quantity += line.quantity } ) } {quantity} artículos</span>
                     <span className="text-right" >S/. {  order?.line_items?.map((line:any)=> { total += line.quantity * line.price_data.unit_amount } ) } {total/100}</span> 
                  </li>
                  <li className="grid grid-cols-3 gap-2 ">
                     <span>Envio</span>  
                     <span>Subtotal</span>  
                     <span className="text-right">S/. {delivery}</span>  
                  </li>
                  <li className="grid grid-cols-2  "> 
                     <span className="font-semibold" >Total</span>
                     <span className="font-semibold text-right" >S/. {(total/100)+delivery}</span> 
                  </li>
                  <li className="grid grid-cols-2 pt-2 border-t border-gray-200 "> 
                     <span className=" " >Pago por el cliente</span>
                     <span className=" text-right" >S/. {(total/100)+delivery}</span> 
                  </li>
                </ul>
            </div>
        </Box> 
      </div>
     <div>
        <Box >
          <div  className="text-sm">
            <h6 className="text-sm" >Notas</h6>
            <p>Sin notas del cliente</p>   
          </div> 
        </Box>
        <Box className="mt-3">
          <ul className="space-y-2 text-sm" >
                <li>
                  <h6  className="text-sm" >Cliente</h6>
                  <p>{order.name}</p> 
                </li>
                <li>
                  <h6  className="text-sm" >Información de contacto</h6>
                  <p>{order.email}</p>
                </li>
                <li>
                  <h6  className="text-sm" >Dirección de envio</h6>
                  <p>{order.name}</p> 
                  <p>{order.streetAddress}</p> 
                  <p>{order.city}</p> 
                  <p>{order.country}</p>  
                </li>
                <li>
                  <h6  className="text-sm" >Dirección de Facturación</h6>
                  <p>Misma dirección</p>  
                </li>
            </ul>
        </Box>
     </div>
   </div>
    </div>
 </div> 
  )
}

export default pageOrder