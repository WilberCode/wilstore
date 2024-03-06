'use client'
import { FormEvent, useRef, useState } from "react";
import useForm from "../../../../hooks/useForm"
import Button from "../atoms/Button";
import Input from "../atoms/Input"
import Textarea from "../atoms/Textarea";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as  StarIconSolid} from "@heroicons/react/24/solid";
import axios from "axios"; 
import { Review } from "../../../../typing";
import TimeAgo from 'react-timeago'
import frenchStrings from 'react-timeago/lib/language-strings/es'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

type formProps = {
    title: string;
    comment: string;
}
type ReviewsProps = {
    product: string; 
    reviews:Review[];
}



const Reviews = ({product, reviews}:ReviewsProps) => {
     const {form,setForm,handleChange} =  useForm<formProps>({title:'',comment:''})

     const [rating, setRating] = useState(0);
     const [reviewsAll, setReviewsAll] = useState<Review[]>(reviews);

     const ratingRef =  useRef(null)
    const sendReview = async(e:FormEvent<HTMLFormElement>)=>{
    
        e.preventDefault(); 
        
        const reviewRes =  await axios.post(`/api/reviews`,{...form,rating,product}) 
        setForm({title:'',comment:''})
        setRating(0)
        setReviewsAll(prev=>[...prev,reviewRes.data]) 
        
    } 
    const btnSubmitValidation = ()=>{
        if(rating===0) {
            ratingRef?.current?.setCustomValidity('Debes selecionar las estrellitas.')
        }else{
            ratingRef?.current?.setCustomValidity('') 
        }
    } 

    const formatter = buildFormatter(frenchStrings)

  return (
    <div className="py-[50px]" >
        <h2>Reseñas</h2> 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-5" >
            <div>
                <div  className=" bg-white rounded-lg   px-8 py-6" >
                <h3>Agregar una reseña</h3>
                <form onSubmit={sendReview} className="mt-4  flex flex-col gap-2" >
               
                    <div  className="flex justify-between" >  
                         <div>   
                            {Array.from({ length: 5 }).map((star,i) =>(
                            
                                <span key={i} onClick={() => setRating(i+1)} className="inline-flex cursor-pointer"  >   
                                    {i+1 <= rating ? <StarIconSolid  className="w-5 text-yellow-500"/>:<StarIcon className="w-5 text-gray-500" />}  
                                   
                                </span>  
                            
                            ))} 
                            {rating===0?<input  ref={ratingRef} className="h-0 w-0 p-0 opacity-0 mx-auto translate-x-14 " required={true} /> :''}
                              
                         </div> 
                        {!!rating && <label>{rating} {rating === 1 ? 'Estrella' : 'Estrellitas'} {['😢','🙂','😊','😀','😎'][rating-1]} </label>}
                    </div>
                   
                    <Input  handleChange={handleChange} name="title" value={form.title} placeholder={'Título'} type="text" required={true} />
                    <Textarea handleChange={handleChange} name="comment" value={form.comment} placeholder={'Escribe tu opinión del producto en una frase'} required={true}/>
                    <div  className="mt-3" >
                        <Button onClick={btnSubmitValidation} $default >Enviar reseña</Button>
                    </div>
                </form>
                </div> 
            </div>
            <div >
                <div   className=" bg-white rounded-lg px-8 py-6 ">
                    <h3>Todas las reseñas</h3>
                    <div  className="mt-3 last-of-type:border-t last-of-type:border-blue-200 " >
                        { reviewsAll.length>0? 
                            reviewsAll?.map((review) =>(
                                <div key={review._id} className="py-4 border-b border-blue-200  ">
                                    <div  className="flex justify-between  " >
                                        <div>
                                        {Array.from({ length: 5}).map((star,i) =>( 
                                            <span key={i}  className="inline-flex "  >   
                                                {i+1 <= review.rating  ? <StarIconSolid  className="w-5 text-yellow-500"/>:<StarIcon className="w-5 text-gray-500" />}  
                                            
                                            </span>  
                                        
                                        ))}     
                                        </div> 
                                         <TimeAgo className="text-sm" date={review.createdAt} formatter={formatter} /> 
                                    </div>
                                    <h5>{review.title}</h5>
                                    <p>{review.comment}</p>

                                </div>
                            ))      
                        :
                        (
                            <p  className="pt-4 " >Sé el primero en poner tu reseña :)</p>
                        ) 
                        }
                    </div>     
                </div>    
                {/* {JSON.stringify(form)} */}

            </div>
        </div>
    </div>
  )
}

export default Reviews