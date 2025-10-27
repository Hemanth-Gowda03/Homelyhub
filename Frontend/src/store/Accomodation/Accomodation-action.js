import { accomodationActions } from "./Accomodation-slice";
import { axiosInstance } from "../../utils/axios";

// Destructure all actions from the slice
const { 
  getAccomodationRequest, 
  getAccomodation, 
  getErrors, 
  setAccomodationDetails 
} = accomodationActions;

// Fetches all accommodations for the logged-in user
export const getAllAccomodation = () => async(dispatch)=>{
  try{
    dispatch(getAccomodationRequest());
    const{data} = await axiosInstance.get("/v1/rent/user/myAccommodation");
    const accom = data.data;
    dispatch(getAccomodation(accom))
  }catch(error){
    const message = error.response ? error.response.data.message : error.message;
    dispatch(getErrors(message));
  }
}

// Creates a new accommodation and then refreshes the list
export const createAccomodation = (accomodationData) => async (dispatch) => {
  try{
    dispatch(accomodationActions.getAccomodationRequest())
    const response = await axiosInstance.post("/v1/rent/user/newAccommodation", accomodationData);
    
    if(!response){
      throw new Error("Could not create accomodation");
    }
    
    // On success, dispatch getAllAccomodation to refresh the state
    dispatch(getAllAccomodation());

  }
  catch(error)
  {
    const message = error.response ? error.response.data.message : error.message;
    dispatch(getErrors(message));
  }
}

// --- THIS IS THE NEW FUNCTION YOU NEED ---
// Fetches the details for a single property
export const getAccomodationDetails = (propertyId) => async(dispatch) => {
  try {
    dispatch(getAccomodationRequest());

    // You MUST check your backend API for the correct URL to get one property
    // RIGHT
    const { data } = await axiosInstance.get(`/v1/rent/listing/${propertyId}`);
    
    // Dispatch the action to save the single property's data
    dispatch(setAccomodationDetails(data.data));

  } catch (error) {
    const message = error.response ? error.response.data.message : error.message;
    dispatch(getErrors(message));
  }
}