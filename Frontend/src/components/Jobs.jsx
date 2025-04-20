import Navbar from "./ui/Shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
// import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {motion} from 'framer-motion'

const Jobs = () => {
     
    const {allJobs, browseInput} = useSelector((state)=>state.job);
    // const {user} = useSelector((state)=>state.auth);

    const [filterJobs , setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if(!browseInput)  setFilterJobs(allJobs);
        else{
            const filterJobs = allJobs.filter((job) => job?.title.toLowerCase().includes(browseInput.toLowerCase()) ||
                 job?.location.toLowerCase().includes(browseInput.toLowerCase())  || 
                 job?.description.toLowerCase().includes(browseInput.toLowerCase())  || 
                 job?.salary.toLowerCase().includes(browseInput.toLowerCase()))
            setFilterJobs(filterJobs);
        }

    }, [allJobs, browseInput]);
    
    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto gap-5 mt-5">
                <div className="flex gap-5">
                    <div className="w-20%">
                        <FilterCard />
                    </div>

                    {filterJobs.length <= 0 ? (
                        <h1>No Jobs Found</h1>
                    ) : (
                        <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                            <div className="grid grid-cols-3 gap-4">
                                {filterJobs.map((job) => (
                                    <motion.div
                                       initial={{ opacity: 0 ,  x:100 }}
                                       animate={{ opacity: 1 ,  x:0 }}
                                       exit={{ opacity: 0 ,  x:-100 }}
                                       transition={{ duration: 0.3 }}
                                      
                                        key={job._id} >
                                       <Job job={job}/>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
