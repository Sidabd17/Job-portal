import React from 'react'
import Navbar from '../ui/Shared/Navbar'
import { useParams } from 'react-router-dom';
// import useGetJobById from '@/hooks/useGetJobById';

import ApplicantsTable from './ApplicantsTable';
import useGetJobApplicants from '@/hooks/useGetJobApplicants';
import { useSelector } from 'react-redux';

const Applicants = () => {
    const params = useParams();
    const jobId = params.id;

    useGetJobApplicants(jobId);

    const {selectedJob} = useSelector(state => state.job);

    const applications = selectedJob.applications;
    
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto'>
             <h1 className='font-bold text-2xl my-5'>Applicants ({applications.length})</h1>
             <ApplicantsTable/>
        </div>
    </div>
  )
}

export default Applicants