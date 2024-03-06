"use client";
import Link from "next/link";
import { ProductProps, WishlistProps } from "../../../../typing";
import Button from "../atoms/Button"; 
import  { cartContext } from "../organisms/CartContext";
import { useContext, useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFill  } from "@heroicons/react/24/solid"; 
import { wishlistContext } from "../atoms/WishListContext";
import CartModal from "../organisms/CartModal";
 

const Product = ({ _id, images, name, price }: ProductProps) => { 
  const {addProduct} = useContext<any>(cartContext)   
  const {inWishlList,addWishList,removeWishList} = useContext<any>(wishlistContext)   
  const [modal, setModal] = useState(false)
  const [product, setProduct] = useState({_id, images, name, price })
  const AddToCart = (e:any) => {
    e.preventDefault();
    addProduct(_id)
    setModal(true) 
  }; 
  const addToWishList = async(e:any)=>{
    e.preventDefault();
    addWishList(_id)
  }
  const removeOfWishList = async(e:any)=>{ 
    e.preventDefault();
    removeWishList(_id)
  } 

  const [isLeaveHover, setIsLeaveHover] = useState(false)
  const leaveHover = ()=>{ 
    console.log('chauuu'); 
    setIsLeaveHover(true) 
  }
  const onHover = ()=>{ 
    setIsLeaveHover(false) 

  }

   
  return (
   <>
      <Link href={'/productos/producto/'+_id} >
      {" "}
      <article className={`product flex flex-col group `} onMouseLeave={leaveHover} onMouseOver={onHover}  >
        <figure className={`product-figure rounded-xl overflow-hidden relative  ${isLeaveHover?'group-hover: before:!translate-x-[150%] ':''} `}>
          <img src={images[0]} alt="" />  
          <span onClick={inWishlList(_id)  ?removeOfWishList:addToWishList}  className="absolute top-4 right-4 z-10  " >
          {inWishlList(_id) ? <HeartIconFill  className="w-6 text-red-600"/> : <HeartIcon  className="w-6 text-black "/>} 
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
    <CartModal isOpen={modal} setModal= {setModal} product={product} />  
   </>
  );
};

export default Product;
