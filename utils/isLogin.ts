import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'; 

const isLogin = () => { 
  const {data:session} = useSession(); 
 /*  useEffect(() => {  
    if (!session) {
        router.push('/login');    
    }  
  }, []);   */
   /* return !!session;   */ 
  if (!session) { 
    return redirect('/login')
  }else{
    return session
  }
   
}

export default isLogin