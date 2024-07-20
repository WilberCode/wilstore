 'use client'
import { createContext, useEffect, useState } from "react"; 
import { useSession } from "next-auth/react"; 
import axios from "axios"; 
import { redirect, useRouter } from "next/navigation";

export const wishlistContext = createContext({}); 
const WishListContext = ({children}:any) => {
  const [wishlist, setWishList] = useState([]); 

  const {data:session} = useSession()
 let userEmail = session?.user?.email
 const router =  useRouter()
 useEffect(() => {
  axios.get(`/api/wishlist`, { params: { onlyIds: true } }).then((res) => {
    setWishList(res?.data);
  });
}, [wishlist]);

 if (!userEmail) { 
  const backupActions =  {
    inWishlList: ()=>false,
    addWishList:()=>{ router.push('/login'); return;},
    removeWishList:()=> { router.push('/login'); return;}
  }
  return <wishlistContext.Provider value={{...backupActions}}>
    {children}
  </wishlistContext.Provider>
 }
  
 const inWishlList =  (productId:never) => { 
   
   return wishlist?.includes(productId)
 } 
 const addWishList = async(productId:string)=>{   
   const wishlistRes =  await axios.post(`/api/wishlist`,{userEmail,productId}) 
   setWishList(wishlistRes?.data?.products) 
 }
 const removeWishList = async(productId:string)=>{ 
   const wishlistRes =  await axios.delete(`/api/wishlist`,{params: {userEmail,productId}})   
   setWishList(wishlistRes?.data?.products)   
 }
 return (
  <wishlistContext.Provider value={{inWishlList,addWishList,removeWishList}}>
    {children}
  </wishlistContext.Provider>
);

}

export default WishListContext