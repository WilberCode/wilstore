import { NextApiRequest, NextApiResponse } from "next";
import mongooseConnect from "../../lib/mongoose";
import mongoose, { Schema, model, models } from "mongoose";
import { Review } from "../../models/Review";
import { Wishlist } from "../../models/Wishlist";
import { currentSession} from "./auth/[...nextauth]"; 
import { getSession } from "next-auth/react";
import clientPromise from "../../lib/mongodb";
 
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
){
 
    const {method} = req;
  
    if (method === 'POST') {    
        const {userEmail,productId} =  req.body;
        if (!userEmail) return res.status(401).json({message: 'No autorizado'});
        
      /*   console.log(userEmail,'from serve wis'); */
        
        await mongooseConnect()
        const db =  mongoose.connection; 
        const user = await db.collection('users').findOne({ 
            email:userEmail
        }); 
     /*    console.log('',user,'aqui'); */
        const userId = user?._id.toString();   
    
        const wishlist = await Wishlist.findOne({user:userId}) 
        if (!!wishlist) {
            if (!wishlist.products.includes(productId)) {
                wishlist.products.push(productId); 
                await wishlist.save(); 
              
                
                res.json(wishlist)  
            }  
        }else{
            const wishlistRes = await Wishlist.create({user:userId, products:[productId]})  
            res.json(wishlistRes)   
            
        }
        
    }
    if (method === 'DELETE') {   
        const {userEmail,productId} =  req?.query;
        if(!userEmail) return res.status(401).json({message: 'No autorizado'});

        await mongooseConnect()
        const db =  mongoose.connection; 
        const user = await db.collection('users').findOne({ 
            email:userEmail
        }); 
        const userId = user?._id.toString();  


        const wishlist = await Wishlist.findOne({user:userId}) 
        if (!wishlist) return
        const index = wishlist.products.indexOf(productId); 
        if (index !== -1) { 
            wishlist.products.splice(index, 1);
           
            if (wishlist.products.length === 0) {
                await Wishlist.findOneAndDelete({user: userId }); 
                res.json(wishlist)
            }else{
                await wishlist.save(); 
                res.json(wishlist)  
            } 
        }  

      

     } 
    
    if (method === 'GET') {   
       const session = await getSession({ req });
    /*    console.log(session); */
       
       if(!session) {
           return ;
       }
        const {onlyIds} =  req?.query; 
       
       
       await mongooseConnect()
       const db =  mongoose.connection;  
       const user = await db.collection('users').findOne({ 
           email: session?.user?.email  
       });
         
       const userId = user?._id.toString();  
        if (!!onlyIds) {
            const wishListDoc = await  await Wishlist.findOne({user: userId })  
            res.json(wishListDoc?.products) 
        }
         else{
            const wishListsDoc = await Wishlist.findOne({user: userId }).populate('products') 
            res.json(wishListsDoc)
        } 
    } 
      
}