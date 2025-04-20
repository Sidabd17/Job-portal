import React, { useEffect, useState } from 'react'
import Navbar from '../ui/Shared/Navbar'
import AdminJobsTable from './AdminJobsTable';
import { Input } from '../ui/input';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { setSearchedJobByText } from '@/redux/jobSlice';
import { motion } from 'framer-motion';

const AdminJobs = () => {
  const navigate = useNavigate();
  const [input , setInput] = useState('');
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchedJobByText(input))
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
                onChange={(e) => setInput(e.target.value)}
                />
                <Button onClick={() => {navigate('/admin/jobs/create')}}>Create New Job</Button>
            </div>
            <AdminJobsTable/>
        </motion.div>
    </div>
  )
}

export default AdminJobs