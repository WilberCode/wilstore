import { NextApiRequest, NextApiResponse } from "next";
import mongooseConnect from "../../lib/mongoose";
import mongoose, { Schema, model, models } from "mongoose";
 
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
){
 
    const {method} = req;
    await mongooseConnect()

    if (method === 'GET') {   
        const productCollection = mongoose.connection.collection('products');
        const products = await productCollection.find({}).toArray(); 
        res.json(products) 
    }
      
}