 

 type  boxProps = {
    children: any;
    className?: string;
 }

const Box = ({children, className}:boxProps) => {
  return (
    <div className={`rounded-lg border bg-white border-blue-200 p-4 ${className}`}>
        {children}
    </div>
  )
}

export default Box