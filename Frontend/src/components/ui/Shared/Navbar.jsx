
import { Link, useNavigate } from "react-router-dom";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

  import {
    Avatar,
    AvatarImage,
  } from "@/components/ui/avatar"  
import { Button } from "../button";
import { LogOut, User, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import axios from "axios";
import { toast } from "sonner";

const Navbar = () => {

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logouthandler = async ()=>{
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/api/v1/user/logout` , {withCredentials: true});
        if(res.data.success){
          dispatch(setUser(null));
          navigate('/');
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        
      }
      
  }

  return (
    <div className="bg-white ">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-5">
          <ul className="flex font-bold items-center gap-5">
            {
              user && user?.role==='recruiter' ? (
                 <>
                    <li><Link to='/admin/companies'>Companies</Link></li>
                    <li><Link to='/admin/jobs'>Jobs</Link></li>
                 </>
              ):(
                <>
                  <li><Link to='/'>Home</Link></li>
                  <li><Link to='/jobs'>Jobs</Link></li>
                  <li><Link to='/browse'>Browse</Link></li>
                </>
              )
            }
            
          </ul>
          {!user ? (
             <div className="flex items-center gap-2">
              <Link to='/login'>
                <Button className="bg-[#100c0b] rounded-sm text-white">Login</Button>
              </Link>
              <Link to='/signup'>
                <Button className="bg-[#043b5d] rounded-sm text-white">Signup</Button>
              </Link>  
             </div>
          ):(<Popover >
                <PopoverTrigger asChild>
                    <Avatar className={"cursor-pointer"}>
                        <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="https://github.com/shadcn.png" />
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80 border-gray-200 border-2 shadow-sm">
                    <div className="flex items-center gap-5">
                        <Avatar className={"cursor-pointer"}>
                            <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png" } alt="https://github.com/shadcn.png"  />
                        </Avatar>
                        <div className="flex flex-col">
                            <h4 className="font-bold inline">{user.fullname}</h4>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <div className="flex flex-col mt-2 items-start text-gray-900">
                    {
                      user && user?.role==='student' && (
                        <div className="flex items-center gap-2 ">
                            <User2/>
                           <Button variant="link"><Link to='/profile'>View Profile</Link></Button>
                        </div>
                      )
                    }  
                        <div className="flex items-center mt-2 gap-2">
                            <LogOut/>
                           <Button onClick={logouthandler} variant="link">Logout</Button>
                        </div>
                        
                    </div>
                </PopoverContent>
            </Popover>
          )}
            
        </div>
      </div>
    </div>
  );
};

export default Navbar;
