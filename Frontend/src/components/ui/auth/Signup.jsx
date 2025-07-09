import React, { useState } from "react";
import Navbar from "../Shared/Navbar";
import { Label } from "../label";
import { Input } from "../input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {loading} = useSelector((state) => state.auth);

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const changeEventhandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const submitHandler = async (e) =>{
    e.preventDefault();
    
    dispatch(setLoading(true));

    try {
        const formData = new FormData();
        formData.append("fullname", input.fullname);  
        formData.append("email", input.email);  
        formData.append("password", input.password);  
        formData.append("phoneNumber", input.phoneNumber);  
        formData.append("role", input.role);  
        if(input.file)formData.append("file", input.file);  

        const res = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/api/v1/user/register`, formData ,{
            headers:{
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        });

        if(res.data.success){
            // toast.success(res.data.message);
            console.log(res.data);
            navigate('/login');
        }
        
    } catch (error) {
        toast.error(error.response.data.message);
        // console.log(error);
        
    }finally{
        dispatch(setLoading(false));
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-r-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Create a fresh account</h1>
          <div className="my-2 flex flex-col gap-2">
            <Label>Full name</Label>
            <Input
              type="text"
              placeholder="Enter your full name"
              name="fullname"
              onChange={(e) => changeEventhandler(e)}
            />
          </div>
          <div className="my-2 flex flex-col gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={(e) => changeEventhandler(e)}
            />
          </div>
          <div className="my-2 flex flex-col gap-2">
            <Label>Phone Number</Label>
            <Input
                type="text"
                placeholder="Enter your phone number"
                name="phoneNumber"
                onChange={(e) => changeEventhandler(e)}
            />
          </div>
          <div className="my-2 flex flex-col gap-2">
            <Label>Password</Label>
            <Input
                type="password" 
                placeholder="Enter password" 
                name="password"
                onChange={(e) => changeEventhandler(e)}
            />
          </div>
          <div className="my-2 flex item-center justify-between gap-2">
            <RadioGroup defaultValue="student">
              <div className="flex items-center gap-4 my-3">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    className={"cursor-pointer"}
                    checked={input.role === "student"}
                    onChange={(e) => changeEventhandler(e)}
                  />
                  <Label htmlFor="r1">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    className={"cursor-pointer"}
                    checked={input.role === "recruiter"}
                    onChange={(e) => changeEventhandler(e)}
                  />
                  <Label htmlFor="r2">Recruiter</Label>
                </div>
              </div>
            </RadioGroup>

            <div className="flex gap-2 items-center">
              <Label>Profile</Label>
              <Input
               accept="image/*" 
               className="cursor-pointer" 
               type="file"
               onChange={(e) => changeFileHandler(e)} />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {
                loading ? (<Button className={'w-full my-4'}><Loader2 className="animate-spin mr-2 h-4 w-4" />Please Wait</Button>):(
                    <Button type="submit" className={"w-full"}>
                        Sign Up
                    </Button>
                )
            }
            
            <span className="text-sm">
              Already have an account?
              <Link to="/login" className="text-[#044959] font-bold mx-2">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
