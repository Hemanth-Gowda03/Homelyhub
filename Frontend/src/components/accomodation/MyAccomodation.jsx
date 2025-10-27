import React from "react";

// Renamed prop to 'accomodations' (plural) for clarity
const MyAccomodation = ({ accomodations }) => {
  // console.log(accomodations);

  return (
    <div className="main-container">
      {/* Map over the plural 'accomodations' prop */}
      {accomodations.map((accomodation) => (
        <div className="myaccomodation-container row" key={accomodation._id}>
          <div className="myaccomodation-image-container col-lg-3 col-md-3">
            <img
              className="myaccomodation-img"
              // Use optional chaining for safety
              src={accomodation.images?.[0]?.url} 
              alt={accomodation.propertyName}
            />
          </div>
          <div className="myaccomodation-information col-lg-9 col-md-9">
            <h6 className="myaccomodation-hotel-name">
              {accomodation.propertyName}
            </h6>
            <div className="stay-information">
              <span className="info">
                <span className="material-symbols-outlined icon">
                  calendar_month
                </span>
                {/* FIX: Corrected spelling */}
                Check In Time: {accomodation.checkInTime}
              </span>
              <span className="material-symbols-outlined icon">
                arrow_forward
              </span>
              <span className="info">
                <span className="material-symbols-outlined icon">
                  calendar_month
                </span>
                {/* FIX: Corrected spelling */}
                Check Out Time: {accomodation.checkOutTime}
              </span>
            </div>
            <p className="myaccomodation-city">
              {/* Use optional chaining for safety */}
              City : {accomodation.address?.city}
            </p>
            <p className="myaccomodation-guest">
              {/* FIX: Check this field name! 
                I'm guessing 'maxGuests' based on your previous error.
              */}
              Max no of guest : {accomodation.maxGuests}
            </p>
            <h5 className="myaccomodation-price">
              <span className="material-symbols-outlined">payments</span> Total
              Price : &#8377; {accomodation.price}
            </h5>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAccomodation;