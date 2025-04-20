import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setBrowseInput } from '@/redux/jobSlice'

const filterData = [
    {
        filterType:"Location",
        array:["Delhi NCR" , "Bengaluru" , "Hyderabad" , "Pune" , "Mumbai" , "Chennai" , "Kolkata"]
    },
    {
        filterType:"Industry",
        array:["Frontend developer" , "Backend developer" , "Full stack developer" , "Data Mining" , "AI/ML"]
    },
    {
        filterType:"Salary",
        array:["0-40k" , "42-1lakh" , "1lakh to 5lakh" ]
    },
]
const FilterCard = () => {

    const [input , setInput] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setInput(value);
    }

    useEffect(()=>{
        dispatch(setBrowseInput(input));
    },[input, setInput])

  return (
    <div className='w-full bg-white p-3 rounded-md'>
        <h1 className='font-bold text-lg'>Filter Jobs</h1>
        <hr className='mt-3'/>
        <RadioGroup value={input} onValueChange={changeHandler}>
            {
                filterData.map((item , index) => (
                    <div key={index} className='flex flex-col gap-2 mt-3'>
                        <h1 className='font-medium'>{item.filterType}</h1>
                        {   
                            item.array.map((item , idx) => {
                                const itemId = `id${index}-${idx}`        
                               return (  
                                <div key={index} className='flex items-center gap-3'>
                                    <RadioGroupItem value={item} id={itemId} className='w-4 h-4'/>
                                    <Label htmlFor={itemId}>{item}</Label>           
                                </div>  
                               )
                            })
                        }
                    </div>
                ))
            }
        </RadioGroup>
    </div>
  )
}

export default FilterCard