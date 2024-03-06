import { NextApiRequest, NextApiResponse } from "next";
import mongooseConnect from "../../lib/mongoose";
import { Product } from "../../models/Product";
import { Order } from "../../models/Order";
import mongoose from "mongoose";
const stripe = require('stripe')(process.env.STRIPE_SK);


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
){

    const {method} = req;


    if (method == "POST"){ 
        await mongooseConnect()  
        const  {userEmail, name,email, city, postalCode, streetAddress, country, products, cartProducts} =  req.body;
        const uniqueIds = [...new Set(cartProducts)] 
        const productInfos =  await Product.find({_id: uniqueIds})

        let line_items = []
        for (const productId of uniqueIds) {
            const productInfo =  productInfos.find(product =>product._id.toString() === productId)
            const quantity = cartProducts.filter((id:string) => id === productId).length || 0
            line_items.push({
                quantity,
                price_data:{
                    currency:'PEN',
                    product_data:{name:productInfo.name},
                    unit_amount: quantity * productInfo.price * 100
                }
            })
        }

        
        const db =  mongoose.connection;  
        const userdata = await db.collection('users').findOne({ 
            email: userEmail  
        });
          
        const userId = userdata?._id.toString();  

        const OrderDoc =  await Order.create({ user:userId,line_items, name,email, city, postalCode, streetAddress, country,paid:false})
        const session =  await stripe.checkout.sessions.create({
            line_items,
            mode:'payment',
            customer_email: email,
            success_url: process.env.PUBLIC_URL+'carrito?success=1',
            cancel_url: process.env.PUBLIC_URL+'carrito?cancel=1',
            metadata:{orderId:OrderDoc._id.toString(), test:'ok'},

        }) 
        
        res.json({
            url:session.url
        })
    }
   
    if (method === "PUT"){ 
        await mongooseConnect()  
        const  {name,email, city, postalCode, streetAddress, country,_id} =  req.body;
        await Order.updateOne({_id},{name,email, city, postalCode, streetAddress, country})
        res.json('Actualizado!!')
    }

    res.status(200).send('Sin datos')
 
}