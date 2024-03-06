import NextAuth, { getServerSession } from 'next-auth' 
import GoogleProvider from 'next-auth/providers/google' 
import FacebookProvider from "next-auth/providers/facebook" 
import clientPromise from '../../../lib/mongodb'
import { MongoDBAdapter } from '@auth/mongodb-adapter' 
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'

const adminEmails = ['deivisspariona@gmail.com']
export const authOptions = {
  providers: [
  
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    }),  
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
   
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  pages:{
    signIn:"/login", 
  },
  adapter: MongoDBAdapter(clientPromise),
  callbacks:{
    session: ({session,token,user})=>{ 
      /* if (!adminEmails.includes(session?.user?.email)) return false; */
      return session;   
    }
  }


}

export default NextAuth(authOptions)

export  async function currentSession(req,res){
  const session = await getServerSession(req,res,authOptions);
  /* if (!adminEmails.includes(session?.user?.email)) { */
     /*  res.status(401);
      res.end();
      throw 'No eres administrador';  */
   /*   res.status(500).send({contenido:'no disponible'}) */
 /*  } */
 return session
}

export  async function isLogiInApi(req,res){
  const session = await getServerSession(req,res,authOptions); 
  if (!session){
    return  
  } else{
    return session
  }
}

export  async function isLogin(){
  const session = await getServerSession(authOptions); 
  if (!session){
    return redirect('/login')
  } else{
    return session
  }
}


