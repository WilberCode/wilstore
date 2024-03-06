import { NextApiRequest, NextApiResponse } from "next";
import mongooseConnect from "../../lib/mongoose";
import mongoose, { Schema, model, models } from "mongoose";
import { Review } from "../../models/Review";
 
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
){
 
    const {method} = req;
    await mongooseConnect()

    if (method === 'POST') {   
        const {title, comment,rating,product} =  req.body;
        const ReviewDoc = await Review.create({title,comment,rating,product:product.toString()})  
        res.json(ReviewDoc) 
    }
 /*    
    if (method === 'GET') {    
        const ReviewDoc = await Review.find({})  
        res.json(ReviewDoc) 
    }  */
      
}