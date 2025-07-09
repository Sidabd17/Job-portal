import { setSelectedJob } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetJobApplicants =  (jobId) => {

    const dispatch = useDispatch();

    useEffect(()=>{
        const getJobApplicants = async(jobId) => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/api/v1/application/${jobId}/applicants`,{
                    withCredentials: true
                })
    
                if(res.data.success){
                    dispatch(setSelectedJob(res.data.job))
                    // toast.success(res.data.message);
                    console.log(res.data.job.applications);
                }
            }catch (error) {
                console.log(error);
            }
        }
        getJobApplicants(jobId);
    },[jobId])
}

export default useGetJobApplicants;