'use client'
import { FormEvent } from "react";
import axios from "axios";
import Button from "../atoms/Button";
import useForm from "../../../../hooks/useForm";
import Input from "../atoms/Input";
import { Order } from "../../../../typing";
import { useSession } from "next-auth/react";

type formProps = {
    name: string;
    email: string;
    city: string;
    postalCode: string;
    streetAddress:string; 
    country:string;
  }
type formPropsCom = {
    products?: any;
    cartProducts?:any;
    order?:Order;
    type?:boolean;
}
const Form = ({products, cartProducts,order,type}:formPropsCom) => {
    const {data:session} =  useSession()
    /* console.log(session,'sw');
     */
    const {form,setForm, handleChange} = useForm<formProps>({
    name: order?.name || '',
    email:order?.email || '',
    city: order?.city || '',
    postalCode: order?.postalCode || '',
    streetAddress:order?.streetAddress || '', 
    country:order?.country || ''
    })
    const formData =  {
        userEmail:session?.user?.email,
        name:form.name,
        email: form.email,
        city: form.city,
        postalCode: form.postalCode,
        streetAddress:form.streetAddress, 
        country:form.country,
    }
 
    const goToPayment = async(e:FormEvent<HTMLFormElement> ) =>{ 
        e.preventDefault() 
        if (type) {
            const res = await axios.post('/api/checkout',{
                ...formData,
                products,
                cartProducts
            })
            const  urlPay =  res.data.url
            if (urlPay) {
                window.location = urlPay
            } 
        }else{
            await axios.put('/api/checkout',{ ...formData,_id: order._id})
           
        }
       
         
    } 
   
    return (
        <form onSubmit={ goToPayment }  className="grid grid-cols-1 gap-3 mt-4 " >
            <Input handleChange={handleChange} name="name" value={form.name} placeholder="Nombre" type="text"/>
            <Input handleChange={handleChange} name="email" value={form.email} placeholder="Correo" type="email"/>
            <div  className="grid grid-cols-2 gap-3 " >
            <Input handleChange={handleChange} name="city" value={form.city} placeholder="Ciudad" type="text"/>
            <Input handleChange={handleChange} name="postalCode" value={form.postalCode} placeholder="Codigo Postal" type="text"/>
            </div>
            <Input handleChange={handleChange} name="streetAddress" value={form.streetAddress} placeholder="Dirección" type="text"/>
            <Input handleChange={handleChange} name="country" value={form.country} placeholder="País" type="text"/> 
            <Button $default $full type="submit" > {type?'Finalizar compra':'Guardar datos'} </Button>
    </form>
    )
}

export default Form