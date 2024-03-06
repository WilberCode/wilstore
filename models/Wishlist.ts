import mongoose, { Schema, model, models } from "mongoose";

const WishlistSchema  =  new Schema({
    user: {  type:  mongoose.Types.ObjectId,  ref: 'User',  required: true},
    products: [{ type: mongoose.Types.ObjectId, ref: 'Product'}], 
}) 

export const Wishlist = models.Wishlist || model('Wishlist', WishlistSchema );
  