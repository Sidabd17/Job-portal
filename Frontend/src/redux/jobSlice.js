import { createSlice } from "@reduxjs/toolkit"; 


const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        selectedJob:null,
        adminJobs:[],
        searchedJobByText:"",
        browseInput:''
    },
    reducers:{
        setAllJobs :(state , action)=>{state.allJobs = action.payload},
        setSelectedJob :(state , action)=>{state.selectedJob = action.payload},
        setAdminJobs :(state , action)=>{state.adminJobs = action.payload},
        setSearchedJobByText :(state , action)=>{state.searchedJobByText = action.payload}, 
        setBrowseInput :(state , action)=>{state.browseInput = action.payload}, 
    }
})

export const {setAllJobs , setSelectedJob, setAdminJobs, setSearchedJobByText,setBrowseInput} = jobSlice.actions;
export default jobSlice.reducer;