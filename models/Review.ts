import mongoose, { Schema, model, models } from "mongoose";

const ReviewSchema  =  new Schema({
    title:String,
    comment: String,
    rating: Number,
    product: { type: Schema.Types.ObjectId, ref: 'Product' }, 
}, {timestamps:true})

export const Review = models.Review || model('Review', ReviewSchema );
  