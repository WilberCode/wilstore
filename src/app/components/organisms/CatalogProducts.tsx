import { ProductProps } from "../../../../typing"
import Product from "../molecules/Product"
  
type Props = {
    products:ProductProps[] 
}
const CatalogProducts = ({products}:Props) => {  
  return (
    <section  className="bg-blue-100 py-[50px]" >
       <div className="container"> 
        <h2>Todos los Productos</h2>
        {!!products && ( 
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6" >
            {products.map((product:ProductProps)=> (<Product key={product._id} {...product}/>)  )}
               
        </div>
       )}
       </div>  
     </section>
  )
}

export default CatalogProducts