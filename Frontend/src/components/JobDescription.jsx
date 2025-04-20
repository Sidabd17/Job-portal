
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import useGetJobById from '@/hooks/useGetJobById';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from './ui/Shared/Navbar';
import axios from 'axios';
import { toast } from 'sonner';
import { setSelectedJob } from '@/redux/jobSlice';
import {motion} from 'framer-motion'

const JobDescription = () => {

    const dispatch = useDispatch();
    
    const params = useParams();
    const jobId = params.id;
    useGetJobById(jobId);

    const job = useSelector((store)=>store.job.selectedJob);

    // const {allJobs} = useSelector((store)=>store.job);
    // const selectedjob = allJobs.find(job=>job._id === jobId);

    const {user} = useSelector((store)=>store.auth);
    const isApplied = job?.applications?.some(application=>application.applicant === user?._id) || false;


    const date = new Date(job?.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        });

        console.log("JOB:", job);
        console.log("APPLICATIONS:", job?.applications);

    const applyJobHandler = async() =>{
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/application/apply/${jobId}` ,{},  {withCredentials: true});
            console.log(res.data);
            
            if(res.data.success){
                toast.success(res.data.message);
                const updatedJob = {
                    ...job,
                    applications: [...job.applications, res.data.application]
                  };
                dispatch(setSelectedJob(updatedJob));

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }    

  return (
    <>
    <Navbar/>
    <motion.div 
    initial={{opacity:0, x:150}}
    animate={{opacity:1, x:0}}
    exit={{opacity:0, x:-150}}
    transition={{duration:0.4}}
    
        className='max-w-7xl mx-auto my-10'>
        <div className='flex items-center justify-between'>
            <div>
                <h1 className='font-bold text-xl '>{job?.title}</h1>
                <div className='flex items-center mt-4 gap-2'>
                    <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} positions</Badge>
                    <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                    <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}</Badge>
                </div>
            </div>
             {
                isApplied ? (<Button disabled={isApplied} className={'my-2 cursor-pointer'}>Already Applied</Button>)
                : (<Button onClick={applyJobHandler} className={'my-2 cursor-pointer'}>Apply now</Button>)
             }
        </div>

        <h1 className='border-b-2 border-gray-300 font-medium py-4'>Job Description</h1>

        <div className='my-4'>
            <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{job?.title}</span></h1>
            <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{job?.location} </span></h1>
            <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{job?.description}</span></h1>
            <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{job?.experienceLevel} yrs</span></h1>
            <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{job?.salary}</span></h1>
            <h1 className='font-bold my-1'>Total Application: <span className='pl-4 font-normal text-gray-800'>{job?.applications?.length}</span></h1>
            <h1 className='font-bold my-1'>Posted DAte: <span className='pl-4 font-normal text-gray-800'>{date}</span></h1>
        </div>
    </motion.div>
    </>
  )
}

export default JobDescription