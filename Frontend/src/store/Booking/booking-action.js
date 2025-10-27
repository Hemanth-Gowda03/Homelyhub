import { axiosInstance } from "../../utils/axios";
// 1. Import ALL the actions you need
import { 
    setBookingDetails, 
    setBookings, 
    sendBookingRequest, 
    getErrors 
} from "./booking-slice";

export const fetchBookingDetails = (bookingId) => async (dispatch) => {
    try {
        dispatch(sendBookingRequest()); // <-- 2. Set loading state
        const response = await axiosInstance.get(`/v1/rent/user/booking/${bookingId}`);
        dispatch(setBookingDetails(response.data.data)); // This is now correct
    } catch (error) {
        console.error("Error fetching booking details", error);
        // 3. Dispatch the error
        dispatch(getErrors(error.response?.data?.message || "Could not fetch details"));
    }
};

export const fetchUserBookings = () => async (dispatch) => {
    try {
        dispatch(sendBookingRequest()); // <-- 2. Set loading state
        const response = await axiosInstance.get("/v1/rent/user/booking");
        dispatch(setBookings(response.data.data.bookings));
    } catch (error) {
        console.error("Error fetching user booking details", error);
        // 3. Dispatch the error
        dispatch(getErrors(error.response?.data?.message || "Could not fetch bookings"));
    }
}