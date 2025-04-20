import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: null,
        allCompanies: [],
        searchedCompaniesByText:""
    },
    reducers: {
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        setAllCompanies: (state, action) => {
            state.allCompanies = action.payload;
        },
        setSearchedCompaniesByText: (state, action) => {
            state.searchedCompaniesByText = action.payload;
        },
    },
});

export const { setSingleCompany, setAllCompanies , setSearchedCompaniesByText} = companySlice.actions;
export default companySlice.reducer;