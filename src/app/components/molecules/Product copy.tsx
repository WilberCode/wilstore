"use client";
import Link from "next/link";
import { ProductProps, WishlistProps } from "../../../../typing";
import Button from "../atoms/Button"; 
import  { cartContext } from "../organisms/CartContext";
import { useContext, useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFill  } from "@heroicons/react/24/solid";
import axios from "axios";
import { useSession } from "next-auth/react";

const Product = ({ _id, images, name, price,inWishlist}: ProductProps) => {

  const {data:session} = useSession();
  let userEmail =session?.user?.email
  
  const {addProduct} = useContext(cartContext) 

  const AddToCart = (e:any) => {
    e.preventDefault();
    addProduct(_id)
  };

  let userID = '6538973f0f3cbdef86c439a5'
/*   const [wishlist, setWishList] = useState<WishlistProps>({}) */
  const [wishlist, setWishList] = useState([])


 
  const isWishList = ()=>{ 
   let isProduct = false 
/*    console.log(wishlist) */
   
/*    if (!wishlist?.products)  return isProduct */
   if (!wishlist)  return isProduct
   for (let w of wishlist) {
  /*   isProduct  =   wishlist?.products?.some((product:any)=>product._id === _id)    */
/*   console.log(w); */
  
    if(w?._id === _id){
      isProduct = true
    } 
    
   }
    return isProduct
  }
 
  
  const addToWishList = async(e:any)=>{
    e.preventDefault(); 
    
    const wishlistRes =  await axios.post(`/api/wishlist`,{userEmail,productId:_id})
    console.log(wishlistRes?.data);
    setWishList(wishlistRes?.data?.products) 
    
  }
  const removeOfWishList = async(e:any)=>{
    e.preventDefault();
    const wishlistRes =  await axios.delete(`/api/wishlist`,{params: {userEmail,productId:_id}})  
    setWishList(wishlistRes?.data?.products) 

  }
  useEffect(() => {
    axios.get(`/api/wishlist`).then(res => {setWishList(res?.data?.products), console.log(res?.data?.products);
    })  
 }, [0])


  return (
    <Link href={'/productos/producto/'+_id} >
      {" "}
      <article className="flex flex-col ">
        <figure className="rounded-xl overflow-hidden relative ">
          <img src={images[0]} alt="" />
          <span onClick={isWishList()?removeOfWishList:addToWishList}  className="absolute top-4 right-4 z-10  " >
           {isWishList()? <HeartIconFill  className="w-6 text-red-600"/> : <HeartIcon  className="w-6 text-black "/>}
          </span>
         
        </figure>
        <div className="py-4">
          <h3 className="text-xl line-clamp-2 ">{name}</h3>
        </div>
        <div className="flex space-x-2 justify-between mt-auto  ">
          <div>
            <span className="block">Precio</span>
            <var className=" max-sm:text-2xl lg:text-2xl not-italic font-semibold  ">
              S/ {price}
            </var>
          </div>

          <Button onClick={AddToCart} $outline $md>
            Agregar al carrito
          </Button>
        </div>
      </article>
    </Link>
  );
};

export default Product;
