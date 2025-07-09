import React, { useEffect, useState } from 'react'
import Navbar from './ui/Shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { setBrowseInput } from '@/redux/jobSlice';

// const jobsArray = [1, 2, 3, 4 , 5];

const Browse = () => {

    const [searchedJobs, setSearchedJobs] = useState([]);

    const {browseInput} = useSelector((state)=>state.job);

    const dispatch = useDispatch();

    useEffect(()=>{
        const getSearchedJobs = async()=>{
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/api/v1/job/get?keyword=${browseInput}`,{withCredentials: true});
                if(res.data.success){
                    console.log(res.data.jobs);
                    toast.success(res.data.message);
                    setSearchedJobs(res.data.jobs);
                    
                }
             } catch (error) {
               console.log(error);
               toast.error(error.response.data.message);
             }
       }
       getSearchedJobs();

       return ()=>{
        dispatch(setBrowseInput(''));
       }
    },[])


  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto my-10'>
            <h1 className='font-bold text-2xl my-10'>Search Results ({searchedJobs?.length})</h1>
            <div className='grid grid-cols-3 gap-4 '>
                {
                    searchedJobs?.map((item) => {
                        return <Job key={item._id} job={item}/>
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Browse