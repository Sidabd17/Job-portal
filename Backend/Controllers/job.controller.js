const Job = require('../models/job.model');

const postJob = async(req, res)=>{
    try {
        const {title , description, requirements, salary, location, jobType, experience , position, companyId} = req.body;
        const userId = req.id;

        if(!title || !description  || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
           return res.status(400).json({
               message:"Something is missing",
               success:false
           })
        }

        // const job = await Job.findOne({title});
        // if(job){
        //     return res.status(400).json({
        //         message:"Job already exists",
        //         success:false
        //     })
        // }

        const newJob = await Job.create({
            title,
            description,
            requirements:requirements.split(','),
            salary,
            location,
            jobType,
            experienceLevel:experience,
            position,
            created_by:userId,
            company:companyId
        })

        return res.status(201).json({
            message:"Job created successfully",
            newJob,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

const getAllJobs = async(req, res)=>{
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {title:{$regex:keyword , $options:"i"}},
                {description:{$regex:keyword , $options:"i"}},  
            ]
        }
        const jobs = await Job.find(query).populate('company').sort({createdAt:-1}).populate('applications');  
        if(!jobs){
            return res.status(404).json({
                message:"No any job found",
                success:false
            })
        }

        return res.status(200).json({
            message:"Jobs Found Successfully",
            jobs,
            success:true
        })
        
    } catch (error) {
        
    }
}
//student
const getJobById = async(req, res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate('company').populate('applications');
        if(!job){
            return res.status(404).json({
                message:"No any job found",
                success:false
            })
        }

        return res.status(200).json({
            message:"Job Found Successfully",
            job,
            success:true
        })
        
    } catch (error) {
        console.log(error);
    }
}

//admin job

const getAdminJobs = async(req, res)=>{
    try {
        const userId = req.id;

        const jobs = await Job.find({created_by:userId}).populate('company');
        if(!jobs){
            return res.status(404).json({
                message:"No any job found",
                success:false
            })
        }

        return res.status(200).json({
            message:"Jobs Found Successfully",
            jobs,
            success:true
        })
    } catch (error) {
        
    }
}

module.exports = {postJob, getAllJobs, getJobById, getAdminJobs}




        