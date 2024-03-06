import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useWishlist = () => {
  const {data:session} = useSession()
  let userEmail = session?.user?.email
  const [wishlist, setWishList] = useState([]); 
  useEffect(() => {
    axios.get(`/api/wishlist`, { params: { onlyIds: true } }).then((res) => {
      setWishList(res?.data);
    });
  }, [wishlist]);
  const inWishlList =  (productId:never) => { 
    return  wishlist?.includes(productId)
  } 
  const addWishList = async(productId:string)=>{  
    const wishlistRes =  await axios.post(`/api/wishlist`,{userEmail,productId}) 
    setWishList(wishlistRes?.data?.products) 
  }
  const removeWishList = async(productId:string)=>{ 
    const wishlistRes =  await axios.delete(`/api/wishlist`,{params: {userEmail,productId}})   
    setWishList(wishlistRes?.data?.products)   
  }

  
  return {wl:{wishlist,inWishlList,setWishList,addWishList,removeWishList}};
};

export default useWishlist;
