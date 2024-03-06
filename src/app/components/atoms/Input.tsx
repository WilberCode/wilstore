import { ChangeEvent } from "react";

type InputProps = {
    handleChange: (e: ChangeEvent<HTMLInputElement>)=>void;
    name:string;
    value:string|number;
    placeholder:string;
    type?:string; 
    required?:boolean;
} 

const Input = ({handleChange,name, value, placeholder,type,required}:InputProps) => {

  let  input_field =     <input type={type} id={name} name={name} value={value} placeholder={placeholder} required={required} onChange={handleChange} className={`${name==='price'?'pl-10   pr-4' : ' px-4 '}`}/>
  return   (
        <label htmlFor={name}  className="w-full block  " >  
        
          {name!=='price'?( 
             <>{input_field}</> 
          ):
          (
          <div  className="flex relative" >
            <span className="block absolute left-4 top-2">{'S/'}</span>
            {input_field} 
          </div>
          )
          }
        </label>   
  ) 
}

export default Input