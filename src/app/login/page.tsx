import { getProviders } from "next-auth/react";
import SignInComponent from "./SignInComponent"; 
import FormRegister from "./FormRegister";
import { authOptions, isLogin } from "../../../pages/api/auth/[...nextauth]"; 
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";


 

const pageLogin = async() => { 
  const session =  await getServerSession(authOptions) 
  if(session) {
    return redirect('/')
  }
 
  const  providers = await getProviders(); 
  return (
    <div>
        <div className="container">
            <div className="flex justify-center py-4 ">
                <div className="bg-white w-full  max-w-[480px] rounded-xl  shadow-2xl p-8 mt-16 " >
                    <h1  className="text-2xl text-center" >Iniciar sessión</h1>
                   
                    <div className="mt-5" >
                        <SignInComponent providers={providers} />
                     </div>  
                     <div className="h-[1px] flex items-center justify-center relative bg-gray-200 mt-8" > <span  className="absolute px-2 bg-white">Ó</span> </div>
                     <div className="mt-8">
                        <FormRegister/>
                     </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default pageLogin