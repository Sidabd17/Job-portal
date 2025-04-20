import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setAllCompanies } from "../redux/companySlice";
const useGetAllCompanies = () => {
   
    const dispatch = useDispatch();

    useEffect(()=>{
        const getCompanies = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/v1/company/get', {withCredentials: true});
                
                if(res.data.success){
                    dispatch(setAllCompanies(res.data.companies));
                    // toast.success(res.data.message);
                    // console.log(res.data.companies);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            }
        }
        getCompanies();
    },[])
}

export default useGetAllCompanies;