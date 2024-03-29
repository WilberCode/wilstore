import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema =  new Schema({
    name:{type:String, required:true},
    description:String,
    price:{type:Number,required:true},
    images:[{type:String}],
    category:  {type: mongoose.Types.ObjectId, ref:'Category' },
    subcategory:  {type: mongoose.Types.ObjectId},
    properties: {type:Object}
}, {timestamps:true})

export const Product = models.Product || model('Product', ProductSchema);
  