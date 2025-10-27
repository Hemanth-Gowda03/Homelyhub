import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; // Or your toast library
import { userActions } from '../../store/User/user-slice'; // Adjust path
import { getSignup } from '../../store/User/user-action';
import '../../css/Login.css'; // <-- FIX 1: ADD THIS CSS IMPORT

const Signup = () => {
  // --- STATE ---
  // You need state to hold all your form fields
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phoneNumber: '',
  });

  // Destructure for easier use in 'value' prop
  const { name, email, password, passwordConfirm, phoneNumber } = user;
  const [submitted, setSubmitted] = useState(false); // <-- Track submission

  // --- HOOKS ---
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get auth state and errors from Redux
  const { isAuthenticated, errors, loading } = useSelector((state) => state.user); // <-- Get loading state

  // --- HANDLERS ---

  // Your onChange handler from image_734ab8.png
  // This correctly handles all form fields
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // You need a submit handler for the form
  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error('Passwords do not match');
      return;
    }

    // Create a new FormData object or plain object to send
    // --- FIX: Added passwordConfirm to the object ---
    const userData = { name, email, password, passwordConfirm, phoneNumber };

    // Dispatch your register action
    dispatch(getSignup(userData)); // <-- 2. UNCOMMENT AND USE getSignup
    setSubmitted(true); // <-- Set submitted flag
  };

  // --- EFFECTS ---

  // Combined effect to handle submission response (success or error)
  useEffect(() => {
    // Only run this logic if we've clicked "Register"
    if (submitted) {
      // And only when the loading is finished
      if (!loading) {
        if (errors && errors.length > 0) {
          // Case 1: Error occurred
          toast.error(errors);
          dispatch(userActions.clearErrors());
          setSubmitted(false); // Reset submitted flag
        } else if (!isAuthenticated) {
          // Case 2: Success (loading finished, no errors, not authenticated)
          toast.success('User registered successfully! Please log in.');
          navigate('/login'); // <-- Redirect to login page
          setSubmitted(false); // Reset submitted flag
        }
      }
    }
  }, [loading, errors, isAuthenticated, submitted, dispatch, navigate]);

  // This effect handles an edge case:
  // If the user is *already* logged in and somehow lands on the signup page.
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirect to home
    }
  }, [isAuthenticated, navigate]);

  // --- JSX RETURN ---
  // This is the combined JSX from your other images
  return (
    <Fragment>
      <div className="row wrapper">
        <form
          onSubmit={submitHandler}
          encType="multipart/form-data"
          className="col-10 col-lg-5"
        >
          <h1 className="mb-3">Register</h1>

          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name_field">Name</label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={onChange}
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email_field">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password_field">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="passwordConfirm_field">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm_field"
              className="form-control"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={onChange}
            />
          </div>

          {/* Phone Number Field */}
          <div className="form-group">
            <label htmlFor="phoneNumber_field">Phone Number</label>
            <input
              type="text"
              id="phoneNumber_field"
              className="form-control"
              name="phoneNumber"
              value={phoneNumber}
              onChange={onChange}
            />
          </div>

          {/* Submit Button */}
          <button
            id="register_button"
            type="submit"
            className="loginbutton btn-block py-3" // <-- FIX 2: CHANGED TO 'loginbutton'
          >
            Register
          </button>
        </form>
      </div>
    </Fragment>
  );
}; // <-- Component function ends here

// --- EXPORT ---
// Only ONE default export at the end of the file
export default Signup;

