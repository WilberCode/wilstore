 
 
import mongooseConnect from '../../lib/mongoose'
import { Product } from '../../models/Product' 
import { ProductProps } from '../../typing'
import Featured from './components/organisms/Featured'
import NewProducts from './components/organisms/NewProducts'
 
const parseProducts = (products:ProductProps|ProductProps[])=>{
  return JSON.parse(JSON.stringify(products)) 
}
export default async function Home() {

  await mongooseConnect()
  const featured_product_data = await Product.findById('669b491db0cc8ed9abb8760d')   
  const featured_product =  parseProducts(featured_product_data)

  const new_products_data = await Product.find({},null,{sort:{'_id':-1}, limit:8})   
  const new_products =  parseProducts(new_products_data)
  /* console.log(new_products); */

 /*  const inWishlist  =  await  */
  
  return (
    <main> 
      
       <Featured product={featured_product} /> 
       <NewProducts products={new_products} />
       <div className="mt-8 bg-blue-80" >
       {/*   <Button $outline>Hola</Button>
         <Button $white>Hola</Button> 
         <Button $default >Hola</Button>  */}
       </div>
    </main>
  )
}
