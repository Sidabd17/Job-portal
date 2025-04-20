import React from 'react'
import LatestJobCards from './LatestJobCards';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import {motion} from 'framer-motion'
const LatestJobs = () => {

  useGetAllJobs();

  const {allJobs} = useSelector((state)=>state.job);

  return (
    <motion.div 
        initial={{opacity:0, y:-100}}
        animate={{opacity:1, y:0}}
        exit={{opacity:0, y:100}}
        transition={{duration:0.4}}
        className='max-w-7xl mx-auto my-20 flex flex-col '>
        <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top</span> Job Openings</h1>
        <div className='grid grid-cols-3 gap-4 my-5 '>
            {
              allJobs.length <= 0 ? <h1>No Jobs Found</h1> : allJobs.slice(0,6).map((item)=><LatestJobCards key={item._id} job={item}/>)
            }
        </div>
    </motion.div>
  )
}

export default LatestJobs