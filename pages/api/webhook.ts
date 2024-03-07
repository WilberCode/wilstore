import { NextApiRequest, NextApiResponse } from "next";
import mongooseConnect from "../../lib/mongoose";
import { buffer } from "micro";
import { Order } from "../../models/Order";
const stripe = require('stripe')(process.env.STRIPE_SK);


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
){

    /* const {method} = req;


    if (method !== "POST"){
        res.json('Seberia')
        return
    } */
    await mongooseConnect()  



// This is your Stripe CLI webhook secret for testing your endpoint locally. 
 
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req) , sig, process.env.ENDPOINTSECRET);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const {orderId} = data.metadata
      const paid  = data.payment_status==='paid'
      if(orderId && paid){
        await Order.findByIdAndUpdate({_id:orderId},{paid:true})
        /* console.log(data); */
      }
      
      /* if */
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
   
}

export const config = {
    api:{bodyParser:false}
}
