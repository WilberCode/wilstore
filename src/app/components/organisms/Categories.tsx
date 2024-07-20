 
import Link from "next/link";
import Product from "../molecules/Product";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Button from "../atoms/Button";
import { Category, ProductProps } from "../../../../typing";

 

 

const Categories = async({categories,products}:any) => { 
  return (
    <div>
         {categories.filter((c:Category) => !c.parent).map((c:Category)=>(
             <div key={c._id} className="mb-12">
                <h2>{c.name} <Link href={'/categoria/'+c._id} className="text-lg underline ml-2" >Ver todo</Link></h2>
                <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4 " >
                    {products.filter((product:ProductProps) =>  product.category === c._id ).slice(0,3).map((product:ProductProps)=>  ( <Product key={product._id}  {...product} />     ))}
                    <Link href={'/categoria/'+c._id}  className="flex justify-center items-center group  w-full aspect-square bg-blue-200 rounded-lg " >
                        <span  className="inline-flex gap-2 " >Ver todo <ArrowRightIcon  className="w-6 group-hover:translate-x-4 group-hover:animate-spin " /> </span>
                    </Link>
                </div>
             </div>
         ) )}
    </div>
  )
}

export default Categories