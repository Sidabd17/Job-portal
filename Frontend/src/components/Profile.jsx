import React, { useEffect, useState } from "react";
import Navbar from "./ui/Shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Contact, Loader2, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobtable from "./AppliedJobtable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverTrigger , PopoverContent} from "./ui/popover";
import { Input } from "./ui/input";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import {motion} from 'framer-motion'


const Profile = () => {
    

    const [open, setOpen] = useState(false);
    const [file , setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((store) => store.auth);
    console.log("Profile" ,user?.profile?.profilePhoto);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!user) navigate('/login');
    },[user])


    const profileChangeHandler = async()=>{
        console.log(file);
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.put(`http://localhost:8000/api/v1/user/profile/update/profilephoto` , formData , {withCredentials: true});
            if(res.data.success){
                toast.success(res.data.message);
                dispatch(setUser(res.data.user))
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }finally{
            setLoading(false);
        }
    }

    const getProfilePhoto = () => {
        const photo = user?.profile?.profilePhoto?.trim();
        return photo ? photo : "https://github.com/shadcn.png";
      };

    return (
        <div>
            <Navbar />
            <motion.div 
                initial={{opacity:0, y:-100}}
                animate={{opacity:1, y:0}}
                exit={{opacity:0, y:100}}
                transition={{duration:0.3}}
             className="max-w-4xl mx-auto bg-slate-200 shadow-lg border border-gray-200 rounded-2xl my-5 p-8">
                <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className={"h-24 w-24"}>
                            <Popover>
                                <PopoverTrigger>
                                   <AvatarImage src={getProfilePhoto()} alt="https://github.com/shadcn.png" />
                                </PopoverTrigger>
                                <PopoverContent className={'flex flex-col gap-3'}>
                                    <AvatarImage className={'w-20 rounded-full '}
                                      src={getProfilePhoto()}
                                      alt="Profile photo" 
                                      />
                                    <div className="flex gap-2">

                                    <Label className={'font-medium text-md'}>Upload</Label>
                                    <Input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => {
                                        setFile(e.target.files[0]);
                                      }}
                                    />
                                    </div>
                                    <Button onClick={profileChangeHandler}>{
                                        loading ? ( <><Loader2 className="animate-spin h-4 w-4 mr-2"/> <span>Loading... please wait</span> </>) : (
                                            <span>Upload new profile pic</span>
                                        )
                                        }
                                    </Button>
                                </PopoverContent>
                            </Popover>
                            
                        </Avatar>
                        <div>
                            <h1 className="font-semibold text-2xl text-[#1e293b] ">{user?.fullname} </h1>
                            <p className="text-[#2e343d] text-sm">
                                {user?.profile.bio}
                            </p>
                        </div>
                    </div>
                    
                    <Button onClick={()=>setOpen(true)} variant={"outline"} className={"text-right"}>
                        <Pen />
                    </Button>
                    
                </div>

                <div className="flex flex-col  gap-4 my-5">
                    <div className="flex items-center gap-3">
                        <Mail/>
                        <span className="text-[#2563eb] hover:underline cursor-pointer">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Contact/>
                        <span className="text-slate-700">{user?.phoneNumber}</span>
                    </div>
                </div>

                <div>
                    <h1 className="font-bold text-lg mb-2">Skills</h1>
                    <div className="flex gap-3 items-center">
                    {
                      user?.profile?.skills.length>0 ? user?.profile?.skills.map((item , ind) =>
                        <Badge className={'px-4 py-2 rounded-full bg-[#d1fae5] text-black border border-[#6ee7b7]  '}
                           key={ind}>{item}
                        </Badge>) : (
                      <Button className={'w-full max-w-sm'} onClick={()=>setOpen(true)}>Upload Skills here</Button>)
                    }
                    </div>
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5 my-2">
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        user?.profile.resume ? (
                            <>
                        <a className="text-blue-600 hover:text-[#1d4ed8] hover:underline font-medium" target="_blank" rel="noopener noreferrer" href={user?.profile?.resume} >
                            {user?.profile?.resumeOriginalName}</a>
                        <Button className={'mt-2 w-[200px] bg-blue-400 text-black hover:bg-blue-200 border border-blue-300 shadow-sm transition duration-300'} onClick={()=>setOpen(true)}>Upload new resume</Button>   
                        </> 
                            )    : 
                        <Button onClick={()=>setOpen(true)} className={'w-full'}>Upload Resume</Button>
                    }
                </div>
            </motion.div>

                <div className="max-w-4xl mx-auto bg-white rounded-2xl">
                     <h1 className="font-bold text-xl my-2" >Applied Job</h1>
                     <AppliedJobtable/>
                </div>

                <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    );
};

export default Profile;
