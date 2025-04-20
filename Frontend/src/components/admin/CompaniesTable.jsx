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
import { Edit2, MoreHorizontal, Pen } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  useGetAllCompanies();
  const navigate = useNavigate();
  const { allCompanies } = useSelector((state) => state.company);
  const [filteredCompanies , setFilteredCompanies] = useState(allCompanies);

  const {searchedCompaniesByText} = useSelector(state => state.company);

  useEffect(()=>{
    if(!searchedCompaniesByText)setFilteredCompanies(allCompanies);
    else {
      const filtered = allCompanies.filter((company) => company?.name.toLowerCase().includes(searchedCompaniesByText.toLowerCase()));
      setFilteredCompanies(filtered);
    }
  },[allCompanies , searchedCompaniesByText])

  return allCompanies.length <= 0 ? (
    <h1 className="text-2xl font-bold">No Companies Found</h1>
  ) : (
    <Table>
      <TableCaption>A List of Your Companies</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Logo</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredCompanies.map((company) => (
          <TableRow key={company._id}>
            <TableCell>
              <Avatar>
                <AvatarImage
                  src={company?.logo || "https://github.com/shadcn.png"}
                />
              </Avatar>
            </TableCell>
            <TableCell>{company?.name}</TableCell>
            <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
            <TableCell className="text-right cursor-pointer">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal />
                </PopoverTrigger>
                <PopoverContent className="w-25 rounded-sm px-5 py-2">
                  <div
                    className="flex items-center gap-2 w-fit cursor-pointer"
                    onClick={() => navigate(`/admin/companies/${company._id}`)}
                  >
                    <Edit2 className="w-4" />
                    <span className="text-sm font-medium">Edit</span>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default CompaniesTable;
