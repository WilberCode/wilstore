
'use client'

import { useEffect, useRef, useState } from "react";
import { Category, ProductProps } from "../../../../typing";
import Product from "../molecules/Product";
import useForm from "../../../../hooks/useForm";

 
 type Props = {
    category:Category
    products:ProductProps[] 
}

const almacenamientoGB = "almacenamiento (GB)";
type FormProps = {
    color: string;
    [almacenamientoGB]: string;
    order:string;
}

const CategoryFilter = ({category,products}:Props) => { 

    const {form,handleChange} =  useForm<FormProps>({color:'',[almacenamientoGB]:'', order:'newest'})

 
    const getUniqueProperties = (attr:string)=>{
        return [...new Set(products.map(product =>product.properties[attr]).filter(value => value !== undefined))]; 
    } 
    const properties = [{name:'color',values: getUniqueProperties('color')},{name:almacenamientoGB, values:getUniqueProperties(almacenamientoGB) }] 
  
    const [productsOrdered, setProductsOrdered] = useState(products)
    useEffect(() => { 
        setProductsOrdered(prev=> [...prev].sort((a:ProductProps,b:ProductProps)=> (
            (form.order==='newest' && new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()) || 
            (form.order==='oldest' &&  new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()) || 
            (form.order==='lowestprice' && a.price - b.price) || 
            (form.order==='highestprice' && b.price - a.price) || 0 )))
    }, [form.order]) 
    
    const prodcutsFilter = productsOrdered.filter(p=> ((!form.color || p.properties.color === form.color) && (!form[almacenamientoGB] || p.properties[almacenamientoGB] === form[almacenamientoGB])))  
 
    const selectRef = useRef(null)
  
   const handler = ()=>{

    if (selectRef.current) {
        selectRef.current.focus();
        
        selectRef.current.click(); 
    }
   }

     
    return (
        <div>
            <div  className="lg:flex justify-between gap-4 mt-8" >  
                <h1>{category?.name}</h1>  
                <div  className="flex max-md:flex-col gap-5" >
                    {properties.map((property) =>(
                        <div key={property.name}  className="flex whitespace-nowrap items-center bg-blue-300 rounded-md overflow-hidden px-3 py-2 ">
                            <label  className="capitalize" htmlFor={property.name}>{property.name}{': '}</label> 
                            <select onChange={handleChange}  name={property.name} id={property.name} className="bg-transparent">
                            <option key={''} value={''}>Todo</option>
                            {property.values.map((value) =>(
                                <option key={value} value={value}>{value}</option>
                            ))}
                            </select> 
                        </div>
                    ))}
                     
                    <div  onClick={handler} className="flex whitespace-nowrap items-center bg-blue-300 rounded-md overflow-hidden px-3 py-2 ">
                        <label    htmlFor={'order'}>{'Ordenar: '}</label> 
                        <select   ref={selectRef} onChange={handleChange}  name={'order'} id={'order'} defaultValue={form.order} className="bg-transparent"> 
                            <option value={'lowestprice'} >Precios bajos primero</option>
                            <option value={'highestprice'} >Precios altos primero</option>
                            <option value={'newest'} >Primero los Nuevos</option>
                            <option value={'oldest'} >Primero los Antiguos</option> 
                        </select> 
                    </div>
                </div> 
            </div> 
            {!!products && ( 
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6" >
                    {prodcutsFilter?.map((product:ProductProps)=> <Product key={product._id} {...product}/> )}
                  
                </div>
            )} 
        </div>
    )
}

export default CategoryFilter