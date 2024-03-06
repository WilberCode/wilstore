'use client';

import { getProviders, signIn } from "next-auth/react";
import Button from "../components/atoms/Button";
import { FaFacebook, FaTwitter, FaInstagram, FaGoogle } from 'react-icons/fa'; // Ejemplos de iconos

type Props = {
    providers: Awaited<ReturnType<typeof getProviders>>;
}

const SignInComponent = ({providers}:Props) => {
/*   console.log(providers);  */
  return (
    <div  className="flex max-sm:flex-col    gap-2" >  
    {
    Object.values(providers!).map(provider =>( 
          <Button   key={provider.name}    className="w-full bg-gray-100 border border-gray-200  text-sm space-x-1  "  onClick={()=>signIn(provider.id,{callbackUrl: process.env.VERCEL_URL || "http://localhost:3000" })}>
            {provider?.name =='Google'? <FaGoogle className="text-red-500"size={30} /> :<FaFacebook className="text-blue-500" size={30} />}<span>Iniciar con {provider.name}</span>
          </Button> 
    ))
    } </div>
  )
}

export default SignInComponent