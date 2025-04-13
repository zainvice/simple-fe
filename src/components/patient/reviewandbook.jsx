import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Spinner from "../../common/spinner";
import { createAppointment } from "../../api/api";

const ReviewAndBook = ({ appointment, openNewAppointment, doctor, setAppointmentDetails, getVisitReason }) => {
 
  const { user } = useSelector((state) => state.auth);
  const [newAppointmentDetails, setNewAppointmentDetails] = useState(appointment);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isAppointmentBooked, setIsAppointmentBooked] = useState(false);
  
  // Validation function for all required fields
  const validateForm = () => {
    const errors = {};
    const { patientDetails, schedulingDetails } = newAppointmentDetails;

    // Validate required fields
    if (!patientDetails.phone) errors.phone = "Phone number is required";
    if (!patientDetails.email) errors.email = "Email is required";
    if (!patientDetails.streetAddress) errors.streetAddress = "Street address is required";
    if (!patientDetails.city) errors.city = "City is required";
    if (!patientDetails.state) errors.state = "State is required";
    if (!patientDetails.zip) errors.zip = "Zip code is required";

    // If insurance is selected, validate insurance fields
    if (paymentMethod === "insurance") {
      if (!patientDetails.insuranceinfo) errors.insuranceinfo = "Insurance name is required";
      if (!patientDetails.memberID) errors.memberID = "Member ID is required";
    }

    // Check if a patient type is selected
    if (!schedulingDetails.patientType) errors.patientType = "Patient type is required";

    return errors;
  };

  // Handle patient type change
  const handlePatientTypeChange = (patientType) => {
    setNewAppointmentDetails((prevDetails) => ({
      ...prevDetails,
      schedulingDetails: { ...prevDetails.schedulingDetails, patientType },
    }));
  };

  // Handle changes in patient details
  const handlePatientDetailsChange = (e, field) => {
    const value = e.target.value;
  
    setNewAppointmentDetails((prevDetails) => {
      const updatedPatientDetails = {
        ...prevDetails.patientDetails,
        [field]: value,
        name: user.firstName + ' ' + user.lastName,
        avatar: user.avatar,
      };
  
      const fullAddress = [
        updatedPatientDetails.streetAddress,
        updatedPatientDetails.apt,
        updatedPatientDetails.city,
        updatedPatientDetails.state,
        updatedPatientDetails.zip,
      ].filter(Boolean).join(", ");
  
      return {
        ...prevDetails,
        patientDetails: {
          ...updatedPatientDetails,
          address: fullAddress,
        },
      };
    });
  };
  

  // Handle address changes
  const handleAddressChange = () => {
    const fullAddress = [
      newAppointmentDetails.patientDetails.streetAddress,
      newAppointmentDetails.patientDetails.apt,
      newAppointmentDetails.patientDetails.city,
      newAppointmentDetails.patientDetails.state,
      newAppointmentDetails.patientDetails.zip,
    ].filter(Boolean).join(", ");

    setNewAppointmentDetails((prevDetails) => ({
      ...prevDetails,
      patientDetails: {
        ...prevDetails.patientDetails,
        address: fullAddress,
      },
    }));
  };

  useEffect(() => {
    if(appointment){
      setNewAppointmentDetails(appointment)
    }
  }, [appointment])
  useEffect(() => {
    if(newAppointmentDetails){
      setAppointmentDetails(newAppointmentDetails)
    }
  }, [newAppointmentDetails])
  // Handle payment method change
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    if (method === "insurance") {
      // Clear insurance fields when switching from Stripe to Insurance
      setNewAppointmentDetails((prevDetails) => ({
        ...prevDetails,
        patientDetails: {
          ...prevDetails.patientDetails,
          insuranceinfo: "",
          memberID: "",
        },
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    handleAddressChange(); 

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    try {
      if (!newAppointmentDetails.type) {
        alert("Please select an appointment type.");
        return;
      }
      if (!newAppointmentDetails.schedulingDetails.visitReason) {
        alert("Please select a visit reason.");
        return;
      }
      console.log(newAppointmentDetails);
      const response = await createAppointment(newAppointmentDetails);
      console.log(response); 
      setIsAppointmentBooked(true);
      
    } catch (error) {
      console.error("Error creating appointment:", error);
     
    } finally {
      setLoading(false); 
    }
  };
  const handleAppointmentTypeChange = (type) => {
    setNewAppointmentDetails((prevDetails) => ({
      ...prevDetails,
      type: type, // Store the selected type (In-Person Appointment or video Appointment)
    }));
  };
  useEffect(() => {
    if (user) {
      
      if (user.email) {
        const e = {target : {value: user.email}}
        handlePatientDetailsChange(e, "email");
      }
      if (user.phone) {
        const e = {target : {value: user.phone}}
        handlePatientDetailsChange(e, "phone");
      }
    }
  }, [user]);
  console.log("Appointment", newAppointmentDetails)

  return (
    <div className="p-6 mt-8 mx-2 border4 flex lg:mx-8 bg-white shadow-md rounded-[10px] max-h-[84%] min-h-[84%] overflow-y-auto">
       <div className="max-w-1/2 w-1/2 bg-white shadow-md rounded-lg p-6 h-[100%] overflow-y-auto relative mb-4">
        {/* Doctor Info */}
        <div className="flex items-center mb-6 p-6 border-2 shadow-md sticky top-0 bg-white">
          <img
            src={appointment.providerDetails.providerAvatar}
            alt="Doctor"
            className="w-24 h-24 rounded-full"
          />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">{appointment.providerDetails.providerName}</h2>
            <p className="text-gray-500">{appointment.providerDetails.providerType}</p>
            <p className="text-gray-500">
              {appointment.date}{' '}{appointment.time}{" "}
              {!isAppointmentBooked && <span className="text-teal-500 font-semibold cursor-pointer" onClick={(e) => openNewAppointment(doctor)}>Update</span>}
              
            </p>
          </div>
        </div>

        {/* Patient Information */}
       
       
         {/* Appointment Type */}
       
        
        {isAppointmentBooked ? 
          <div className="flex flex-col text-center h-60 justify-center text-[#1EBDB8] p-4 mb-4 rounded-md ">
            <span className="material-symbols-outlined text-[104px] my-4"> new_releases </span>
            <p className="text-center font-semibold text-2xl">Appointment successfully booked</p>
          </div>
        : 
          <>
           <h3 className="text-lg font-semibold mb-4">Patient Information</h3>
           <div className="flex mb-4">
          <button
            className={`flex-1 py-2 ${newAppointmentDetails.schedulingDetails.patientType === 'new' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black'} rounded-l-md`}
            onClick={() => handlePatientTypeChange('new')}
          >
            New Patient
          </button>
          <button
            className={`flex-1 py-2 ${newAppointmentDetails.schedulingDetails.patientType === 'returning' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black'} rounded-r-md`}
            onClick={() => handlePatientTypeChange('returning')}
          >
            Returning Patient
          </button>
        </div>
        <h3 className="text-lg font-semibold mb-4">Appointment Type</h3>
            <div className="flex mb-4">
          <button
            className={`flex-1 py-2 ${newAppointmentDetails.type === 'In-Person Appointment' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black'} rounded-l-md`}
            onClick={() => handleAppointmentTypeChange('In-Person Appointment')}
          >
            In Person Appointment 
          </button>
          <button
            className={`flex-1 py-2 ${newAppointmentDetails.type === 'Video Appointment' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black'} rounded-r-md`}
            onClick={() => handleAppointmentTypeChange('Video Appointment')}
          >
            Video Appointment
          </button>
        </div>
        {/* Contact Information */}
        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
        {/* Email Field */}
        <div className="mb-4">
          <label className="text-gray-700 font-medium block mb-1">Your Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter your email"
            value={newAppointmentDetails.patientDetails.email || user.email}
            onChange={(e) => handlePatientDetailsChange(e, "email")}
            disabled={user.email}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Phone Field */}
        <div className="mb-4">
          <label className="text-gray-700 font-medium block mb-1">Phone number</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter phone number"
            value={newAppointmentDetails.patientDetails.phone}
            onChange={(e) => handlePatientDetailsChange(e, "phone")}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        {/* Street Address Field */}
        <div className="mb-4">
          <label className="text-gray-700 font-medium block mb-1">Street Address</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter street address"
            value={newAppointmentDetails.patientDetails.streetAddress}
            onChange={(e) => handlePatientDetailsChange(e, "streetAddress")}
          />
          {errors.streetAddress && <p className="text-red-500 text-sm">{errors.streetAddress}</p>}
        </div>

        {/* City, State, Zip Code */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-gray-700 font-medium block mb-1">City</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter city"
              value={newAppointmentDetails.patientDetails.city}
              onChange={(e) => handlePatientDetailsChange(e, "city")}
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>
          <div>
            <label className="text-gray-700 font-medium block mb-1">State</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter state"
              value={newAppointmentDetails.patientDetails.state}
              onChange={(e) => handlePatientDetailsChange(e, "state")}
            />
            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-gray-700 font-medium block mb-1">Zip</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter zip code"
              value={newAppointmentDetails.patientDetails.zip}
              onChange={(e) => handlePatientDetailsChange(e, "zip")}
            />
            {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
          </div>
        </div>

        {/* Payment Method */}
        <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
        <div className="flex mb-4">
          <button
            className={`flex-1 py-2 ${paymentMethod === 'stripe' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black'} rounded-l-md`}
            onClick={() => handlePaymentMethodChange("stripe")}
          >
            Stripe
          </button>
          <button
            className={`flex-1 py-2 ${paymentMethod === 'insurance' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black'} rounded-r-md`}
            onClick={() => handlePaymentMethodChange("insurance")}
          >
            Insurance
          </button>
        </div>

        {/* Insurance Fields (display when insurance is selected) */}
        {paymentMethod === "insurance" && (
          <div>
            <div className="mb-4">
              <label className="text-gray-700 font-medium block mb-1">
                Insurance Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your insurance provider"
                value={newAppointmentDetails.patientDetails.insuranceinfo}
                onChange={(e) => handlePatientDetailsChange(e, "insuranceinfo")}
              />
              {errors.insuranceinfo && <p className="text-red-500 text-sm">{errors.insuranceinfo}</p>}
            </div>
            <div className="mb-4">
              <label className="text-gray-700 font-medium block mb-1">
                Member ID
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your insurance member ID"
                value={newAppointmentDetails.patientDetails.memberID}
                onChange={(e) => handlePatientDetailsChange(e, "memberID")}
              />
              {errors.memberID && <p className="text-red-500 text-sm">{errors.memberID}</p>}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          className="w-full py-3 text-white bg-teal-500 rounded-md font-medium"
          onClick={handleSubmit}
        >
          {loading ? <Spinner /> : "Book Appointment"}
        </button>
          </>
        
        
        }
      </div>
      <div className="max-w-1/2 p-6 h-[100%] overflow-y-auto w-1/2 shadow-md text-center flex flex-col">
          <h1 className="text-[22px] font-semibold text-[#1EBDB8]">Appointment Details</h1>
          <div className=" my-2 shadow-md p-4 text-center">
            <p className="text-[20px] font-semibold text-[#1EBDB8]">Your Details</p>
            <div className='flex flex-col items-center  mt-4'>
                      <img
                          src={newAppointmentDetails?.patientDetails?.avatar} 
                          alt="Patient"
                          className="w-14 h-14 rounded-full mr-3"
                      />
                      <span className="text-lg font-semibold text-[#1EBDB8] font-medium mt-3">{newAppointmentDetails?.patientDetails?.name}</span>
                  </div>
            <p>{newAppointmentDetails.schedulingDetails.patientType?.toUpperCase()} PATIENT</p>
            <p>{newAppointmentDetails.patientDetails.email}</p>
            <p>{newAppointmentDetails.patientDetails.phone}</p>
            <p>{newAppointmentDetails.patientDetails.streetAddress}</p>
            <p>{newAppointmentDetails.patientDetails.state}</p>
            <p>{newAppointmentDetails.patientDetails.zip}</p>
          </div>
          <div className=" my-2 shadow-md p-4 text-center">
            <p className="text-[20px] font-semibold text-[#1EBDB8]">Booking Information</p>
            <p>{getVisitReason(newAppointmentDetails.schedulingDetails.visitReason)}</p>
            <p>{newAppointmentDetails.type}</p>
            <p>{newAppointmentDetails.date}(yyyy-mm-dd)</p>
            <p>{newAppointmentDetails.time}</p>
          </div>
      </div>
    </div>
  );
};

export default ReviewAndBook;
