import { ChangeEvent } from "react";

type TextareaProps = {
    handleChange: (e: ChangeEvent<HTMLTextAreaElement>)=>void;
    name:string;
    value:string|number;
    placeholder:string; 
    required:boolean;
} 

const Textarea = ({handleChange,name, value, placeholder,required}:TextareaProps) => {
  return   (
        <label htmlFor={name}  className="w-full block " > 
        <span  className="text-sm mb-1 block">{placeholder}</span>
          <textarea  id={name} name={name} value={value}  onChange={handleChange} required={true} className='py-2 w-full block px-4 rounded-lg border border-gray-400  focus-within:outline-gray-600'  />
        </label>   
  ) 
}

export default Textarea