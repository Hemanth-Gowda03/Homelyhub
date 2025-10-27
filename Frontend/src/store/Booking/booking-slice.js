import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookings: [],
    bookingDetails: {},
    loading: false,
    errors: null // <-- 1. Add error state
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        sendBookingRequest(state) {
            state.loading = true;
            state.errors = null; // <-- Clear old errors on a new request
        },
        setBookings(state, action) {
            state.bookings = action.payload;
            state.loading = false;
        },
        addBooking: (state, action) => {
            state.bookings.push(action.payload);
        },
        setBookingDetails: (state, action) => {
            // 2. FIX: Accept the payload directly
            state.bookingDetails = action.payload; 
            state.loading = false; // <-- 3. Also set loading to false
        },
        // 4. ADD this new reducer
        getErrors(state, action) {
            state.errors = action.payload;
            state.loading = false;
        }
    }
});

export const {
    sendBookingRequest,
    setBookings,
    addBooking,
    setBookingDetails,
    getErrors // <-- 5. Export the new action
} = bookingSlice.actions;

export default bookingSlice;