'use client'

import { useState } from "react";

const SingleProductGallery = ({images}:any) => {
  const [activeImage, setActiveImage] = useState( images?.[0])
   
  
  return (
    <div>
        <picture  className="rounded-xl overflow-hidden block " >
           <img src={activeImage} alt="" />
        </picture>
        { images?.length> 1 && (
          <div className="grid place-items-center  grid-cols-3 mt-4 gap-4"> 
            {!!images && images.map((image:string,index:number) => <div key={index}  className={` rounded-xl overflow-hidden transition-all duration-300 ${image === activeImage? 'ring-2 ring-blue-500 ':'opacity-80'} `} ><img  onClick={()=>setActiveImage(image)} className="w-full cursor-pointer max-w-[200px]" src={image} alt="" /></div> )} 
        </div>
        )

        }
    </div>
  )
}

export default SingleProductGallery