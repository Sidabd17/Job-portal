import { setAdminJobs } from '@/redux/jobSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useGetAdminJobs = () => {
   
    const dispatch = useDispatch();

   useEffect(()=>{
    const getAdminJobs = async()=>{
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/api/v1/job/getadminjobs`,{
                withCredentials: true
            })
            if(res.data.success){
                dispatch(setAdminJobs(res.data.jobs))
                // toast.success(res.data.message);
                // console.log(res.data.jobs);
            }
        } catch (error) {
            console.log(error);
        }
    }
    getAdminJobs();
   },[])
}

export default useGetAdminJobs