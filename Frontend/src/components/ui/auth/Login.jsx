import React, { useState } from "react";
import Navbar from "../Shared/Navbar";
import { Label } from "../label";
import { Input } from "../input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "../button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);

    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
      });
    
      const changeEventhandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
      };

      const submitHandler = async (e) =>{
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/api/v1/user/login`, input ,{
                headers:{
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
    
            if(res.data.success){
                toast.success(res.data.message);
                dispatch(setUser(res.data.user))
                navigate('/');
            }
            
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
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
          <h1 className="font-bold text-xl mb-5">Login to Your account</h1>
          <div className="my-2 flex flex-col gap-2">
            <Label>Email</Label>
            <Input type="email" name="email" placeholder="Enter your email"
              onChange={changeEventhandler} />
          </div>
          <div className="my-2 flex flex-col gap-2">
            <Label>Password</Label>
            <Input type="password" placeholder="Enter password"
              name="password" onChange={changeEventhandler}/>
          </div>
          <div className="my-2 flex item-center justify-between gap-2">
            <RadioGroup >
              <div className="flex items-center gap-4 my-3">
                <div className="flex items-center space-x-2">
                    <Input
                    type="radio"
                    name="role"
                    value="student"
                    className={'cursor-pointer'}
                    checked={input.role === "student"}
                    onChange={changeEventhandler}
                    />
                    <Label htmlFor="r1">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    className={'cursor-pointer'}
                    checked={input.role === "recruiter"}
                    onChange={changeEventhandler}
                    />
                    <Label htmlFor="r2">Recruiter</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          {
            loading ? <Button className={'w-full my-4'}><Loader2 className="animate-spin mr-2 h-4 w-4" />Please Wait</Button> :(
                <div className="flex flex-col gap-3">
                    <Button type="submit" className={'w-full'}>Login</Button>
                </div>
            )
        }
        <span className="text-sm">Have not created any account yet?<Link to='/signup' className="text-[#044959] font-bold mx-2">Signup</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Login
