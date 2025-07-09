import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'

const AppliedJobtable = () => {

    const [appliedJobs , setAppliedJobs] = useState([]);

    const navigate = useNavigate();


    useEffect(()=>{
        const fetchAppliedJobs = async ()=>{
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/api/v1/application/get`, {withCredentials: true});

                if(res.data.success){
                    console.log(res.data.applications);
                    setAppliedJobs(res.data.applications);
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAppliedJobs();
    },[])

  return (
    <motion.div 
        initial={{opacity:0, x:-100}}
        animate={{opacity:1, x:0}}
        exit={{opacity:0, x:100}}
        transition={{duration:0.4}}
    >
        <Table>
            <TableCaption>A list of Your applied jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className={'text-right'}>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                {
                  appliedJobs && appliedJobs?.map((Item,ind)=>{
                       return (
                          <TableRow onClick={()=>navigate(`/description/${Item?.job?._id}`)} key={ind}>
                                    <TableHead>{Item?.createdAt.split('T')[0]}</TableHead>
                                    <TableHead>{Item?.job?.title}</TableHead>
                                    <TableHead>{Item?.job?.company?.name}</TableHead>
                                    <TableHead className={'text-right'}>
                                        <Badge className={Item?.status === 'accepted' ? 'bg-green-500' : Item?.status === 'rejected' ? 'bg-red-500' : 'bg-blue-500' }>{Item?.status}</Badge>
                                    </TableHead>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    </motion.div>
  )
}

export default AppliedJobtable