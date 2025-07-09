import React, { useState } from 'react'
import Navbar from '../ui/Shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setAllCompanies, setSingleCompany } from '@/redux/companySlice'

const CreateCompany = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {allCompanies} = useSelector((state)=>state.company);

    const [companyName, setCompanyName] = useState('');

    const registerCompany = async () =>{
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/api/v1/company/register`,{companyName},{
                headers:{
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })

            if(res.data.success){
                toast.success(res?.data?.message);
                dispatch(setSingleCompany(res?.data?.company));
                // dispatch(setAllCompanies([...allCompanies, res?.data?.company]));
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
  return (
    <div>
        <Navbar/>
        <div className='max-w-4xl mx-auto'>
            <div className='my-10'>
                <h1 className='font-bold text-2xl my-5'>Your Company name</h1>
                <p className='text-gray-500 '>What would you like to call your company? you can change this later</p>
            </div>
            

            <Label >Company Name</Label>
            <Input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="my-2 input input-bordered w-full max-w-xs outline-0 shadow-none"
            />

            <div className='flex items-center gap-2 my-10'>
                <Button onClick={()=>{navigate('/admin/companies')}} variant={'outline'}>Cancel</Button>
                <Button onClick={registerCompany}>Continue</Button>
            </div>
        </div>
    </div>
  )
}

export default CreateCompany