 'use client'

import { redirect, usePathname, useRouter } from "next/navigation"
import MenuLink from "../atoms/MenuLink"
import Link from "next/link" 
import { useContext, useEffect, useRef, useState } from "react"
import { cartContext } from "./CartContext"
import { ArrowDownIcon, Bars3Icon, ChevronDownIcon, MagnifyingGlassIcon, UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { signIn, signOut, useSession } from "next-auth/react" 
import ButtonLink from "../atoms/ButtonLink"

 

const Header = () => {

  const {data:session} =  useSession()
  const router = useRouter()
  const current_path =  usePathname()
  const currentPath = (link_name:string)=>{ 
      return  current_path?.includes(link_name ) 
  } 
  const {cartProducts} = useContext(cartContext) 
  const [showNav, setShowNav] = useState(false)
  const navRef = useRef(null) 
  const navMenuRef = useRef(null)

  const toggleShowNav = ()=>{
    setShowNav(!showNav)
    const  nav_content_ref = navMenuRef.current
    if (nav_content_ref) {
      const heightUsingOffsetHeight = nav_content_ref.offsetHeight;
      navRef.current.style.height  = heightUsingOffsetHeight+'px' ;  
      }  
  }
  useEffect(() => {
    const menu = document.querySelector('nav>ul')!
    menu.addEventListener('click',closeNav)
    return () => {
      menu.addEventListener('click',closeNav)

    };
  }, [0]) 
  
  const closeNav = (e:any) => {  
    if(e.target.closest('a')){
     setShowNav(false)  
    }  
  }

  
  return (
    <header  className="bg-blue-600 py-2" > 
        <div className="container">
           <div className="md:flex justify-between" >
             <div  className="flex justify-between" >
                <div  className="flex items-center" > <Link href="/" ><h1  className="text-white" >Wil<span className="text-blue-400" >Store</span></h1></Link> </div>
                <button className="md:hidden" onClick={toggleShowNav} > {!showNav?(<Bars3Icon  className="w-8 h-8 text-white " /> ):(<XMarkIcon  className="w-8 h-8 text-white " /> )} </button>  
             </div>
             <nav ref={navRef} className={" relative max-md:transition-all md:!h-auto "+(showNav?'opacity-100 z-10 ':' max-md:-z-10 max-md:opacity-0 max-md:!h-0')}>
                <ul  ref={navMenuRef}  className="  md:flex  items-center md:space-x-4 text-white "> 
                    <MenuLink name="Home"  link="/" active={current_path==='/'} /> 
                    <MenuLink name="Productos"   link="/productos" active={currentPath('/productos')} /> 
                    <MenuLink name="Categorias"  link="/categorias" active={currentPath('/categorias')} /> 
                    <MenuLink name={`Carrito (${cartProducts?.length})`}  link="/carrito" active={currentPath('/carrito')} />  
                    <li  className="py-2" ><Link href="/search"> <MagnifyingGlassIcon  className="w-6 h-6" /> </Link></li>
                 {/*    <MenuLink name="Cuenta"  link="/cuenta" active={currentPath('/cuenta')}/>  */}
                    <li className=" relative group  after:content-[''] after:absolute after:w-full after:h-6 py-2  " >
                       <div  onClick={()=>!session?router.push('/login'):router.push('/cuenta')} className="flex items-center gap-2 cursor-pointer"   > 
                          <div>  { session?.user? <img className="w-8 rounded-full " src={session.user.image!}/> :<UserCircleIcon className="w-8 h-8"/> }  </div>
                          <div  className="text-sm leading-snug" > <strong>¡Hola!</strong> <div> { session?.user? session.user.name :'Iniciar sessión' } </div> </div>
                          <ChevronDownIcon className="w-45 h-5 group-hover:rotate-180 transition-all "/>
                       </div>
                       <div  className={`w-full right-0 absolute z-10 mt-2 bg-white text-black rounded-lg border border-gray-200 hidden group-hover:block overflow-hidden shadow-xl ${!session?.user&&'min-w-[250px]'}`}>
                        {session?.user? ( 
                          <ul  className="w-full" >
                              <li className="border-b border-gray-100 hover:bg-gray-100 " ><Link href="/cuenta"  className=" block px-3 py-2"  > Mi cuenta  </Link></li>
                              <li><button  className="px-3 py-2 w-full text-left    hover:bg-gray-100"   onClick={()=>signOut()} > Cerrar sessión  </button></li> 
                          </ul>
                        ):(
                          <div className="p-4 text-center" > 
                              <div  className=" pb-4" >
                                <ButtonLink href="/login" $default $md  >Iniciar sessión</ButtonLink>
                              </div>
                              <div className="pt-4 border-t border-gray-200 ">
                                <p>¿Eres nuevo en shop?</p>
                                <Link href="/cuenta" className="underline">Crea tu cuenta</Link>
                              </div>
                          </div>
                        )}
                       </div>
                     
                     </li>
                </ul> 
             </nav>
           </div>
        </div>
    </header>
  )
}

export default Header