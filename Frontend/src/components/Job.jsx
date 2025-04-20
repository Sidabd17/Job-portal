import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar , AvatarImage , AvatarFallback} from '../components/ui/avatar'
import { Badge } from './ui/badge'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Job = ({job}) => {
  
    const job_id = job._id;

    const daysAgofunction = (mongoDbTime) =>{
        const createdAt = new Date(mongoDbTime);
        const currentDate = new Date();
        const timeDiff = currentDate - createdAt;
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        return days;
    }
    


  return (
    <motion.div 
    initial={{opacity:0, y:-100}}
    animate={{opacity:1, y:0}}
    exit={{opacity:0, y:100}}
    transition={{duration:0.4}} 
    className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
        <div className='flex items-center justify-between'>
            <p className='text-gray-600 text-sm'>{daysAgofunction(job?.createdAt)===0?"Today":daysAgofunction(job?.createdAt)+" days ago"} </p>
            <Button variant={"outline"} className={'rounded-full'}><Bookmark/></Button>
        </div>

        <div className='flex items-center gap-2 my-2'>
            <Button className={'p-6'} variant={'outline'} size='icon'>
                <Avatar>
                    <AvatarImage
                    src={job?.company?.logo}/>
                </Avatar>
            </Button>
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-gray-800 text-sm'>India</p>
            </div>
        </div>

        <div>
            <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
            <p className='text-sm text-gray-600'>{job?.description}</p>
        </div>

        <div className='flex items-center mt-4 gap-2'>
            <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} positions</Badge>
            <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
            <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}</Badge>
        </div>

        <div className='flex items-center gap-4 mt-4'>
            <Button variant={'outline'}><Link to={`/description/${job_id}`}>Details</Link></Button>    
            <Button className={'bg-[#7209b7]'}>Save For Later</Button>
        </div>
    </motion.div>
  )
}

export default Job