 
import mongooseConnect from "../../../lib/mongoose"
import { Product } from "../../../models/Product"
import { ProductProps } from "../../../typing" 
import CatalogProducts from "../components/organisms/CatalogProducts"
import FilterProducts from "../components/organisms/FilterProducts"

const parseProducts = (products:ProductProps|ProductProps[])=>{
    return JSON.parse(JSON.stringify(products)) 
}
const Productos = async() => {
    await mongooseConnect()
    const products_data = await Product.find({},null,{sort:{'_id':-1} })   
    const products =  parseProducts(products_data)

    /* const products_data = await Category.find({},null,{sort:{'_id':-1} })   

     */
   /*  console.log(products); */
    
  return (
    <div>
        {/* <FilterProducts/> */}
        <CatalogProducts products={products}  />
    </div>
  )
}

export default Productos