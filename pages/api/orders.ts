import { NextApiRequest, NextApiResponse } from "next";
import mongooseConnect from "../../lib/mongoose";
import mongoose, { Schema, model, models } from "mongoose";
import { Order } from "../../models/Order";
import { getSession } from "next-auth/react";
 
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
){
 
    const {method} = req; 

    if (method === 'GET') {  
        const session = await getSession({ req });
      /*   console.log(session); */
        
        if(!session) {
            return ;
        } 
         
        await mongooseConnect()
    /*     const db =  mongoose.connection;  */
      /*   const user = await db.collection('users').findOne({ 
            email: session?.user?.email  
        }); */
       /*  const user = await db.collection('users').findOne({ 
            email: session?.user?.email  
        }); */

        const db =  mongoose.connection;  
        const userdata = await db.collection('users').findOne({ 
            email: session?.user?.email  
        });
          
        const userId = userdata?._id.toString();  


        
        const ordersDoc = await Order.find({user:userId})   
        if(!!ordersDoc){
            res.json(ordersDoc) 
        } else{
            return
        }
        
        
/*   
        const ordersDoc = await Order.find({})   */
       
    }
      
}