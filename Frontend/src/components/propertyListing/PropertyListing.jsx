import React, { useEffect } from "react";
import PropertyImg from "./PropertyImg";
import "../../css/PropertyListing.css"
import PropertyAmenities from "./PropertyAmenities";
import PaymentForm from "./PaymentForm";
import PropertyMapInfo from "./PropertyMapInfo";
import {useDispatch,useSelector} from "react-redux"
import { useParams } from "react-router-dom";
// FIX 1: Import the correct action from the correct file
import { getAccomodationDetails } from "../../store/Accomodation/Accomodation-action";
import LoadingSpinner from "../LoadingSpinner";

const PropertyListing =() => {
    const dispatch = useDispatch();
    const {id} = useParams();
    
    // FIX 2: Select from the 'accomodation' slice
    const{loading, accomodationDetails: propertyDetails}= useSelector((state)=>state.accomodation)
    
    useEffect(() =>{
        // FIX 3: Dispatch the imported action
        dispatch(getAccomodationDetails(id))
    },[dispatch,id])

    // This loading check is correct, especially if you set initialState to null
    if(loading || !propertyDetails){
        return(<div className="row justify-content-around mt-5">
            <LoadingSpinner/>
        </div>);
    }
    
    // This destructuring is now correct
    const{propertyName, address,
          description,images,amenities,
          maximumGuest,price,currentBookings
    }=propertyDetails;

    return(
        <div className="property-container">
            <p className="property-header">{propertyName}</p>
            <h6 className="property-location">
                <span className="material-symbols-outlined">House</span>
                <span className="location">
                    {`${address?.area}, ${address?.city}, ${address?.state}, ${address?.pincode}`}
                </span>
            </h6>
            {/* These components are now safe because the loading check passed */}
            <PropertyImg images={images} />
            <div className="middle-container row">
                <div className="des-and-amenities col-md-8 col-sm-12 col-12">
                    <h2 className="property-description-header">Description</h2>
                    <p className="property-description">{description}
                        <br></br>
                         Max number of guests : {maximumGuest}
                    </p>
                    <hr/>
                    <PropertyAmenities amenities={amenities}/>
                </div>
                <div className="property-payment col-md-4 col-sm-12 col-12">
                    <PaymentForm
                    propertyId={id}
                    price={price}
                    propertyName={propertyName}
                    address={address}
                    maximumGuest={maximumGuest} // This is now correctly passed
                    currentBookings={currentBookings}
                    />
                </div>
            </div>
            <hr/>
            <div className="property-map">
                <div className="map-image-exinfo-container row">
                    <PropertyMapInfo address={address}/>
                </div>
            </div>
        </div>
    )
}
export default PropertyListing