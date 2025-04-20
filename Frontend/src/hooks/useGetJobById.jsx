import axios from "axios";
import { useEffect }  from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { setSelectedJob } from "../redux/jobSlice";

const useGetJobById = (id)=>{

    const dispatch = useDispatch();

    useEffect(()=>{
        const getJobById = async(id)=>{
             try{
                const res = await axios.get(`http://localhost:8000/api/v1/job/get/${id}`,{
                    withCredentials: true
                })
    
                if(res.data.success){
                    dispatch(setSelectedJob(res.data.job))
                    // toast.success(res.data.message);
                    // console.log(res.data.job);
                }
             }catch(error){
                console.log(error);
             }
        }
        getJobById(id);
    },[id, dispatch])
}

export default useGetJobById;