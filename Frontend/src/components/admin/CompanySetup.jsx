import React, { useEffect, useState } from 'react'
import Navbar from '../ui/Shared/Navbar'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllCompanies, setSingleCompany } from '@/redux/companySlice'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {

    const params = useParams();
    const companyId = params.id;

    useGetCompanyById(companyId);

    const {singleCompany, allCompanies} = useSelector((state) => state.company);


    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [input, setInput] = useState({
        name:"",
        description:"",
        website:"",
        location:"",
        file:null
    });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
      setInput({...input,[e.target.name]: e.target.value});
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
      setInput({...input, file});
    }

    const submitHandler = async (e) => {
      e.preventDefault();
      setLoading(true);

      const formData = new FormData();
        formData.append("name", input.name);  
        formData.append("description", input.description);  
        formData.append("website", input.website);  
        formData.append("location", input.location);  
        if(input.file)formData.append("file", input.file);

        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_API_URL}/api/v1/company/update/${companyId}` , formData , {
                headers:{
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })

            if(res.data.success){
                toast.success(res?.data?.message);  
                dispatch(setSingleCompany(res?.data?.company));  
                navigate(`/admin/companies`);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            
        }finally{
            setLoading(false);
        }

      console.log(input);
    }

    useEffect(()=>{
       setInput({
            name:singleCompany?.name || "",  
            description:singleCompany?.description || "",
            website:singleCompany?.website || "",
            location:singleCompany?.location || "",
       })
    },[singleCompany])

  return (
    <div>
        <Navbar/>
        <div className='max-w-xl mx-auto my-10'>
            <div className='flex items-center gap-5 p-8'>
                <Button onClick={()=>{navigate('/admin/companies')}} variant="outline" className={'flex items-center gap-2 text-gray-500 font-semibold'}>
                    <ArrowLeft/>
                    <span>Back</span>
                </Button>
                <h1 className='text-xl font-bold'>Company Setup</h1>
            </div>

            <form onSubmit={submitHandler} >
                  <div className='grid grid-cols-2'>
                  <div className='flex gap-2 items-center mt-5 mx-4'>
                    <Label>Company Name</Label>
                    <Input type="text" name="name" placeholder="Company Name" 
                           value={input.name} onChange={handleInputChange} />
                  </div>
                  <div className='flex gap-2 items-center mt-5 mx-4'>
                    <Label>Description </Label>
                    <Input type="text" name="description" placeholder="Description" 
                           value={input.description} onChange={handleInputChange} />
                  </div>
                  <div className='flex gap-2 items-center mt-5 mx-4'>
                    <Label>Website</Label>
                    <Input type="text" name="website" placeholder="website" 
                           value={input.website} onChange={handleInputChange} />
                  </div>
                  <div className='flex gap-2 items-center mt-5 mx-4'>
                    <Label>Location</Label>
                    <Input type="text" name="location" placeholder="Location" 
                           value={input.location} onChange={handleInputChange} />
                  </div>
                  <div className='flex gap-2 items-center mt-5 mx-4'>
                    <Label>Logo</Label>
                    <Input type="file" accept="image/*" onChange={handleFileChange}
                            />
                  </div>
                  </div>
                    <Button type="submit" className={'mt-5 w-full'} >
                        {
                            loading ? ( 
                                <div className='flex items-center gap-2'>
                                    <Loader2 className='animate-spin'/>
                                    <span>Please Wait</span>
                                </div>
                            ) : "Update"
                        }
                        </Button>
            </form>
        </div>
    </div>
  )
}

export default CompanySetup