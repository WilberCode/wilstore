import { Suspense } from "react"
import mongooseConnect from "../../../lib/mongoose"
import { Category } from "../../../models/Category" 
import { Product } from "../../../models/Product"
import { jsonStringToParse } from "../../../utils/jsonStringToParse"
import Categories from "../components/organisms/Categories"
import dynamic from "next/dynamic"

 
const CategoriesPage = async() => { 
  await mongooseConnect()
  const categories_data =  await Category.find()
  const products_data =  await Product.find()
  const categories =  jsonStringToParse(categories_data)
  const products = JSON.parse(JSON.stringify(products_data))
 /*  console.log(categories); */
  
  return (
    <div>
        <div className="container">
            <h1  className="mb-6 pt-8" >Categorias</h1>
            <Suspense  fallback={ <p>Cargando...</p> } >
              <Categories categories={categories} products={products}/>
            </Suspense>
        </div>
    </div>
  )
}

export default CategoriesPage