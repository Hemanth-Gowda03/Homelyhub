import { createSlice } from "@reduxjs/toolkit";

// ...
const accomodationSlice = createSlice({
  name: "accomodation",
  initialState:{
    accomodation: [],
    // BEFORE:
    // accomodationDetails: {},
    // AFTER:
    accomodationDetails: null, // <-- CHANGE THIS
    loading:false,
    errors:null,
  },
// ...
  reducers:{
    getAccomodationRequest(state){
      state.loading = true;
    },
    getAccomodation(state,action){
      state.accomodation= action.payload;
      state.loading= false;
    },
    // 2. ADD THIS NEW REDUCER
    setAccomodationDetails(state, action){
      state.accomodationDetails = action.payload;
      state.loading = false;
    },
    getErrors(state, action){
      state.errors = action.payload;
      state.loading= false
    }
  }
})

// 3. Make sure you export the actions
export const accomodationActions = accomodationSlice.actions;
export default accomodationSlice;