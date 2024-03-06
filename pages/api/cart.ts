import { NextApiRequest, NextApiResponse } from "next";
import mongooseConnect from "../../lib/mongoose";
import mongoose, { Schema, model, models } from "mongoose";
import { ObjectId } from "mongodb";
import { Product } from "../../models/Product";
 
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
){
 
    const {method} = req;
    await mongooseConnect()

    if (method === 'POST') {   
        const {ids}  = req.body
        if (!ids) return res.json({respuesta:'sin datos'})    
        res.json(await Product.find({_id: ids})  )
         
    }
      
}