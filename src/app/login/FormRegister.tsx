'use client' 
import useForm from "../../../hooks/useForm";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
const FormRegister = () => {
  const {form, handleChange } = useForm({email:'',password:''})
  return (
    <form action="" className=" space-y-4 ">
        <Input handleChange={handleChange} name="email" value={form.email} placeholder="Correo" type="email" />  
        <Input handleChange={handleChange} name="password" value={form.password} placeholder="Contraseña" type="password" /> 
         <div  className="text-center pt-2" >
            <Button $default >Iniciar sessión</Button>
         </div>
    </form>
  )
}

export default FormRegister