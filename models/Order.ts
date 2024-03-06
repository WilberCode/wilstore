import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema =  new Schema({
    user: {  type:  mongoose.Types.ObjectId,  ref: 'User',  required: true},
    line_items: Object,
    name:String,
    email: String,
    city: String,
    postalCode: String,
    streetAddress:String, 
    country:String, 
    paid:Boolean,
},{timestamps:true})


export const  Order = models.Orders || model('Orders',OrderSchema)