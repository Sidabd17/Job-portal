import React, { useState } from "react";
import Navbar from "../ui/Shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import {motion} from 'framer-motion'

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    experience: "",
    salary: "",
    location: "",
    jobType: "",
    position: 0,
    companyId: "",
  });

  const navigate = useNavigate();

  const [loading , setLoading] = useState(false);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandle = (value) =>{
    setInput({ ...input, companyId: value });
    console.log(input.companyId);
  }

  const { allCompanies } = useSelector((state) => state.company);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/api/v1/job/post`, input, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
      
          if (res?.data?.success) {      
            toast.success(res?.data?.message);
            console.log(res?.data);
            navigate("/admin/jobs");
          }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }finally{
        setLoading(false);
    }
    
  };

  return (
    <div>
      <Navbar />
      <motion.div 
    initial={{opacity:0, y:100}}
    animate={{opacity:1, y:0}}
    exit={{opacity:0, y:-100}}
    transition={{duration:0.4}} className="max-w-4xl mx-auto my-3 p-2">
        <h1 className="text-2xl font-bold">Create a new job</h1>

        <form onSubmit={submitHandler}>
          <div className="my-3 mx-auto max-w-3xl grid grid-cols-2 shadow-lg border-gray-200 rounded-2xl p-3">
            <div className="flex flex-col items-center gap-1 my-2">
              <Label className={"font-bold text-lg"}>Job Title</Label>
              <Input
                type="text"
                placeholder="Job Title"
                name="title"
                value={input.title}
                onChange={handleChange}
                className="border border-2 focus:border-none focus:outline-none focus:shadow-none border-black w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col items-center gap-1 my-2">
              <Label className={"font-bold text-lg"}>Description</Label>
              <Input
                type="text"
                placeholder="Description"
                name="description"
                value={input.description}
                onChange={handleChange}
                className="border border-2 focus:border-none focus:outline-none focus:shadow-none border-black w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col items-center gap-1 my-2">
              <Label className={"font-bold text-lg"}>Requirements</Label>
              <Input
                type="text"
                placeholder="Requirements"
                name="requirements"
                value={input.requirements}
                onChange={handleChange}
                className="border border-2 focus:border-none focus:outline-none focus:shadow-none border-black w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col items-center gap-1 my-2">
              <Label className={"font-bold text-lg"}>Salary</Label>
              <Input
                type="text"
                placeholder="Salary"
                name="salary"
                value={input.salary}
                onChange={handleChange}
                className="border border-2 focus:border-none focus:outline-none focus:shadow-none border-black w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col items-center gap-1 my-2">
              <Label className={"font-bold text-lg"}>Experience Level</Label>
              <Input
                type="text"
                placeholder="Experience Level"
                name="experience"
                value={input.experience}
                onChange={handleChange}
                className="border border-2 focus:border-none focus:outline-none focus:shadow-none border-black w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col items-center gap-1 my-2">
              <Label className={"font-bold text-lg"}>Location</Label>
              <Input
                type="text"
                placeholder="Location"
                name="location"
                value={input.location}
                onChange={handleChange}
                className="border border-2 focus:border-none focus:outline-none focus:shadow-none border-black w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col items-center gap-1 my-2">
              <Label className={"font-bold text-lg"}>Job Type</Label>
              <Input
                type="text"
                placeholder="Job Type"
                name="jobType"
                value={input.jobType}
                onChange={handleChange}
                className="border border-2 focus:border-none focus:outline-none focus:shadow-none border-black w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col items-center gap-1 my-2">
              <Label className={"font-bold text-lg"}>Position</Label>
              <Input
                type="text"
                placeholder="Position"
                name="position"
                value={input.position}
                onChange={handleChange}
                className="border border-2 focus:border-none focus:outline-none focus:shadow-none border-black w-full max-w-xs"
              />
            </div>

            {allCompanies.length > 0 && (
              <div className="flex flex-col items-center gap-1 mx-2 my-3">
                <Select onValueChange={selectChangeHandle}>
                  <SelectTrigger className="w-[90%]">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Companies</SelectLabel>
                       {
                         allCompanies.map((company) => (
                           <SelectItem key={company._id} value={company._id}>
                             {company.name}
                           </SelectItem>
                         ))
                       }
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-center justify-center col-span-2">
              <Button type="submit" className="my-4 mx-auto w-md">
                {
                    loading ? (
                        <>
                        <Loader2 className="animate-spin mr-2 h-4 w-4" />
                        <span className="mr-2 text-sm">Please Wait</span>
                        </>
                    ) : (
                        <>Post job</>
                    )
                }
              </Button>
            </div>
            {allCompanies.length === 0 && (
              <p className="text-red-600 text-sm font-bold my-2">
                Please register a company first before posting a new job
              </p>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PostJob;
