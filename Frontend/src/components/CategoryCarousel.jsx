import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setBrowseInput } from '@/redux/jobSlice'
import {motion} from 'framer-motion'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Mobile Developer", 
    "Data Scientist",
]

const CategoryCarousel = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (query)=>{
     dispatch(setBrowseInput(query));
     navigate('/browse');
  } 


  return (
    <motion.div 
    initial={{opacity:0, x:150}}
    animate={{opacity:1, x:0}}
    exit={{opacity:0, x:-150}}
    transition={{duration:0.4}}>
        <Carousel className={'w-full max-w-xl mx-auto my-20'}>
            <CarouselContent>
                {
                    category.map((category, ind)=>(
                        <CarouselItem key={ind} className={'md:basis-1/2 lg-basis-1/3'}>
                            <Button onClick={()=>handleSearch(category)} variant="outline" className={'rounded-full bg-gray-400'}>{category}</Button>
                        </CarouselItem>
                    ))
                }
                
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
        </Carousel>
    </motion.div >
  )
}

export default CategoryCarousel
