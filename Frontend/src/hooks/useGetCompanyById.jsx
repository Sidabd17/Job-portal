import { setSingleCompany } from "@/redux/companySlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";


const useGetCompanyById = (id) => {
    const dispatch = useDispatch();
       useEffect(()=>{
            const getCompanyById = async () =>{
                try {
                    const res = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/api/v1/company/get/${id}`, {withCredentials: true});

                    if(res.data.success){
                        // toast.success(res.data.message);
                        dispatch(setSingleCompany(res.data.company)); 
                      }
                } catch (error) {
                    console.log(error);
                    toast.error(error.response.data.message);
                }
            }
            getCompanyById();
       },[id, dispatch])
    }; 
    
    export default useGetCompanyById;