import SingleProductGallery from "@/app/components/molecules/SingleProductGallery";
import mongooseConnect from "../../../../../lib/mongoose";
import { Product } from "../../../../../models/Product"; 
import SingleProductContent from "@/app/components/molecules/SingleProductContent";
import { ProductProps, queryProps } from "../../../../../typing";
import RelatedProducts from "@/app/components/organisms/RelatedProducts";
import Reviews from "@/app/components/organisms/Reviews";
import { Review } from "../../../../../models/Review";


const parseProducts = (products:ProductProps|ProductProps[])=>{
  return JSON.parse(JSON.stringify(products)) 
}

const singleProduct = async({params:{id}}:queryProps) => {
  await mongooseConnect() 
  const product_data =  await Product.findById(id)
  const catId = product_data.category.toString() 
/*   const products_related_data =  await Product.find({"category":{"$in":catId}})  */
  const products_related_data =  await Product.find({category:catId,_id:{$ne:id}}) 
  const reviews_data =  await Review.find({product:id})
  
  const product = parseProducts(product_data)
  const productsRelated = parseProducts(products_related_data) 
  const reviews =JSON.parse(JSON.stringify(reviews_data)) 

  return (
    <div >
        <div className="container">
          <div className="grid  grid-cols-1 sm:grid-cols-2 pt-8 gap-8 md:gap-14 "> 
             <SingleProductGallery images={product.images}/> 
             <SingleProductContent product={product} />
          </div>
          <div> 
          <Reviews product={id}  reviews={reviews}/>
          <RelatedProducts products={productsRelated}/> 
            {/* <code>
              {JSON.stringify(product)}
              </code> */}
              
          </div>
          
        </div>
    </div>
  )
}

export default singleProduct