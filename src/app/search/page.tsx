'use client'
import { Suspense, useEffect, useState } from "react";
import useForm from "../../../hooks/useForm"
import Input from "../components/atoms/Input"
import { ProductProps } from "../../../typing";
import axios from "axios";
import Product from "../components/molecules/Product";

type formProps = {
    search:string;
}
 
const pageSearch = () => {
  const {form ,handleChange}  =  useForm<formProps>({ search:''})
  const [products, setProducts] = useState<ProductProps[]>([])
  useEffect(() => {
    axios.get('/api/products').then((res) => setProducts(res.data))
  }, [0])

  let searchProducts = []
  searchProducts =  products.filter(product => product.name.toLowerCase().includes(form.search.toLowerCase()))

  return (
    <div>
        <div className="container mt-8">
          <Input handleChange={handleChange} name="search"  placeholder="Buscar productos" value={form.search} type="search" /> 
         

          {form.search && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 ">
                    {searchProducts.map(product =>  <Product key={product._id} {...product} /> )}
            </div>
          )}
       

        </div>
    </div>
  )
}

export default pageSearch