 
import {   queryProps } from '../../../../typing'
import mongooseConnect from '../../../../lib/mongoose'
import { Category } from '../../../../models/Category'
import { jsonStringToParse } from '../../../../utils/jsonStringToParse'
import CategoryFilter from '@/app/components/organisms/CategoryFilter'  
import { Product } from '../../../../models/Product'
const Categoria = async({params:{id}}:queryProps) => {
  await mongooseConnect()
  const category_data  = await Category.findById({_id:id})
  const products_data  = await Product.find({category:id})
  const category = jsonStringToParse(category_data)
  const products = JSON.parse(JSON.stringify(products_data))
/*   console.log(products);
   */
  return (
    <div> 
        <div className="container"> 
           <CategoryFilter category={category} products={products} /> 
        </div>
    </div>
  )
}

export default Categoria