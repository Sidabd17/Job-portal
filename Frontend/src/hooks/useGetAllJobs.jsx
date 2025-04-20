import { setAllJobs } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useGetAllJobs = () => {
   
    const dispatch = useDispatch();

   useEffect(()=>{
    const getJobs = async()=>{
        try {
            const res = await axios.get('http://localhost:8000/api/v1/job/get',{
                withCredentials: true
            })

            if(res.data.success){
                dispatch(setAllJobs(res.data.jobs))
                // toast.success(res.data.message);
                // console.log(res.data.jobs);
            }
        } catch (error) {
            console.log(error);
        }
    }
    getJobs();
   },[])
}

export default useGetAllJobs
