 
 import Link from 'next/link';  
 type Props = {
  name:string;
  link: string; 
  active?:boolean; 
  className?:string;
 }

const menuLink = ({name,link, active, className}:Props) => {
  
  return (
            
          !active?(  
              <li  >  <Link href={link}   className={`flex items-center   py-4 ${className&&className}`} ><span className="relative z-[2]">{name} </span>  </Link></li>
          ):
          (
              <li>  <Link href={link}  className={`flex items-center   py-4  border-b-2 border-white rounded-t-xl relative ${className&&className}`} ><div className="nav-link" /><div className="nav-link nav-link--bottom" /> <span   >{name} </span>  </Link></li>
          ) 
        )
}

export default menuLink
