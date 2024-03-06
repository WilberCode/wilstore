 
import { ProductProps } from "../../../../typing" 
import Product from "../molecules/Product"

type Props = {
    products:ProductProps[] 
}
const RelatedProducts = ({products}:Props) => {
  return (
    <section  className="bg-blue-100 py-[50px]" > 
        <h2>Productos Relacionados</h2>
        {!!products && ( 
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6" >
            {products.map((product:ProductProps)=> (<Product key={product._id} {...product}/>)  )}
               
        </div>
       )} 
     </section>
  )
}

export default RelatedProducts