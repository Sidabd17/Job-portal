import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Edit2, Eye, MoreHorizontal, Pen } from "lucide-react";
import { Popover ,PopoverContent, PopoverTrigger} from "../ui/popover";
// import {  } from "@radix-ui/react-popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAdminJobs from "@/hooks/UseGetAdminJobs";

const AdminJobsTable = () => {
    useGetAdminJobs();
    const navigate = useNavigate();
    const { adminJobs } = useSelector((state) => state.job);
    const [filteredJob , setFilteredJob] = useState(adminJobs);
  
    const {searchedJobByText} = useSelector(state => state.job);
  
    useEffect(()=>{
      if(!searchedJobByText)setFilteredJob(adminJobs);
      else {
        const filtered = adminJobs.filter((job) => job?.title.toLowerCase().includes(searchedJobByText.toLowerCase())
                                                || job?.company?.name.toLowerCase().includes(searchedJobByText.toLowerCase())
                                                || job?.description.toLowerCase().includes(searchedJobByText.toLowerCase()));
        setFilteredJob(filtered);
      }
    },[adminJobs , searchedJobByText])
  
    return adminJobs?.length <= 0 ? (
      <h1 className="text-2xl font-bold">No Job Found</h1>
    ) : (
      <Table>
        <TableCaption>A List of Your Recent Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJob?.map((job) => (
            <TableRow key={job._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src={job?.company?.logo || "https://github.com/shadcn.png"}
                  />
                </Avatar>
              </TableCell>
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-30 rounded-sm px-2 py-2">
                    <div
                      className="flex items-center gap-2 w-fit cursor-pointer"
                      onClick={() => navigate(`/admin/jobs/${job._id}`)}
                    >
                      <Edit2 className="w-4" />
                      <span className="text-sm font-medium">Edit</span>
                    </div>
                    <div className="flex gap-2 w-fit cursor-pointer"
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      >
                      <Eye className="w-4" />
                      <span className="text-sm font-medium">Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
}

export default AdminJobsTable