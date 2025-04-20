import React, { useEffect, useState } from 'react'
import Navbar from '../ui/Shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { setSearchedCompaniesByText } from '@/redux/companySlice'
import {motion} from 'framer-motion'

const Companies = () => {
  
    const navigate = useNavigate();
    const [input , setInput] = useState('');
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchedCompaniesByText(input))
    },[input])

  return (
    <div>
        <Navbar/>
        <motion.div 
            initial={{opacity:0, y:100}}
            animate={{opacity:1, y:0}}
            exit={{opacity:0, y:-100}}
            transition={{duration:0.4}} 
        
            className='max-w-6xl mx-auto my-10'>
            <div className='flex items-center justify-between my-5'>
                <Input
                className={'w-fit'}
                placeholder="Filter By Name"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                />
                <Button onClick={() => {navigate('/admin/companies/create')}}>New Company</Button>
            </div>
            <CompaniesTable/>
        </motion.div>
    </div>
  )
}

export default Companies