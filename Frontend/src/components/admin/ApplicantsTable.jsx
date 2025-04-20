import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { useSelector } from 'react-redux';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal, MoreHorizontalIcon } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const ApplicantsTable = () => {
  
    const {selectedJob} = useSelector(state => state.job);

    const applications = selectedJob.applications;

    const statushandler = async(status , id)=>{
        try {
            const res = await axios.put(`http://localhost:8000/api/v1/application/status/${id}/update` , {status} , 
                {withCredentials: true});

            if(res.data.success){
                toast.success(res.data.message);
                console.log(res.data.application);
                
            }    
        } catch (error) {
           console.log(error);
           toast.error(error.response.data.message);
        }
    }

  return (
    <div>
        {
            applications.length === 0 ? <h1 className='text-2xl text-center mx-auto font-bold mt-5'>No Applicants Found</h1> : 
            (<Table>
                <TableCaption>A list of Your applied users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Profile Pic</TableHead>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className={'text-right'}>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applications?.map((application)=>{
                            return (
                            <TableRow key={application._id}>
                                <TableCell><img src={application?.applicant?.profile?.profilePhoto} alt="" className='w-10 h-10 rounded-full'/></TableCell>
                                <TableCell>{application?.applicant?.fullname}</TableCell>
                                <TableCell>{application?.applicant?.email}</TableCell>
                                <TableCell>{application?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    <a className='text-blue-600 cursor-pointer underline' href={application?.applicant?.profile?.resume} target="_blank" >
                                        {application?.applicant?.profile?.resumeOriginalName}
                                    </a>
                                    </TableCell>
                                <TableCell>{application?.createdAt.split('T')[0]}</TableCell>
                                <TableCell className={'text-right'}>
                                    {
                                        <Popover>
                                            <PopoverTrigger><MoreHorizontalIcon/></PopoverTrigger>
                                            <PopoverContent className={'flex flex-col gap-2 w-32 p-3'}>
                                                <button className={'text-green-900 font-medium'} onClick={() => statushandler('accepted' , application._id)}>Accept</button>
                                                <button className={'text-red-600 font-medium'} onClick={() => statushandler('rejected' , application._id)}>Reject</button>
                                            </PopoverContent>
                                        </Popover>
                                    }
                                </TableCell>
                            </TableRow>
                            ) 
                        })
                    }
                    
                </TableBody>
    
            </Table>)
        }
        
    </div>
  )
}

export default ApplicantsTable