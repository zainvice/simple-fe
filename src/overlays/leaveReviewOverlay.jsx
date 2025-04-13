import React, { useState, useEffect } from "react";
import Spinner from "../common/spinner";
import { updateAppointment } from "../api/api";
import { updateUserByEmail } from "../api/userCalls";
import { getUserByEmail } from "../api/userCalls";

const feedbackMessages = [
  "We're so sorry! Tell us how we can improve.",
  "Oh no! We want to do better.",
  "Appreciate the honesty—thank you!",
  "Yay! We're glad it went well!",
  "You're amazing! Thanks for the love 💖"
];

const LeaveReviewOverlay = ({ onClose, appointment, side }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [user, setUser] = useState('')

  const handleStarClick = (index) => setRating(index + 1);

  useEffect(()=> {
    const fetchUser = async( email ) => {
        
        try {
            
            const response = await getUserByEmail(email)
            setUser(response)
            
        } catch (error) {
            console.error("Error", error)
           
        }
    }
    if(appointment){
       if(side === 'patient'){
          fetchUser(appointment.providerDetails.providerEmail)
       }
       if(side === 'provider'){
          fetchUser(appointment.patientDetails.email)
       }
    }
    
  }, [side, appointment])

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    let updatedAppointment = appointment
    if(side === 'patient'){
        const pd = updatedAppointment.patientDetails || {};
        pd.review = {rating, comment};
        updatedAppointment.patientDetails = pd
    }
    if(side === 'provider'){
        const pd = updatedAppointment.providerDetails || {};
        pd.review = {rating, comment};
        updatedAppointment.providerDetails = pd
    }
    try {
      console.log("Sending", updatedAppointment)
      await updateAppointment(appointment._id, updatedAppointment);
      let userData = { ...user };
      const newReview = {
          name: side === 'patient' ? appointment.patientDetails.name : appointment.providerDetails.providerName,
          avatar: side === 'patient' ? appointment.patientDetails.avatar : appointment.providerDetails.providerAvatar,
          rating,
          comment,
      };  
      // Initialize reviews if not present
      const existingReviews = user.reviews || [];
      const totalPreviousRating = existingReviews.reduce((sum, r) => sum + r.rating, 0);
      const newTotalRating = totalPreviousRating + rating;
      const newRatingAvg = newTotalRating / (existingReviews.length + 1);  
      userData.reviews = [...existingReviews, newReview];
      userData.rating = parseFloat(newRatingAvg.toFixed(2)); 
      console.log("sending", userData)
      await updateUserByEmail(user.email, userData);
      setShowSuccessPopup(true);
      setIsSubmitting(false);
      setTimeout(() => {
        setShowSuccessPopup(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Submit review error:", error);
      setSubmitError("⚠️ Could not submit review. Try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-lg relative">
        <button className="absolute top-6 left-4 text-gray-600" onClick={onClose}>
          <span className="material-symbols-outlined text-[#1EBDB8]">chevron_left</span>
        </button>

        {showSuccessPopup && (
          <div className="fixed top-20 right-10 bg-[#1EBDB8] text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-slideIn">
            Review Submitted!
          </div>
        )}

        {submitError && (
          <div className="fixed top-20 right-10 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-slideIn">
            {submitError}
          </div>
        )}

        <h2 className="text-center text-xl font-semibold text-[#1EBDB8]">Leave a Review</h2>

        <div className="flex flex-col items-center mt-4">
          <img
            src={side === 'patient' ? appointment?.providerDetails?.providerAvatar : appointment?.patientDetails?.avatar}
            alt="Provider Avatar"
            className="w-20 h-20 rounded-full mb-3"
          />
          <h3 className="text-2xl font-semibold text-gray-700">{side === 'patient' ? appointment?.providerDetails?.providerName : appointment?.patientDetails?.name}</h3>
          <p className="text-gray-500">{ side === 'patient' ? appointment?.providerDetails?.practiceName : appointment?.patientDetails?.email}</p>
        </div>

        <div className="flex justify-center mt-4">
          {[...Array(5)].map((_, index) => (
            <button
              key={index}
              onClick={() => handleStarClick(index)}
              className={`text-3xl transition-colors duration-200 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ★
            </button>
          ))}
        </div>

        {rating > 0 && (
          <div className="mt-2 text-center">
            <p className="text-sm text-gray-600 italic">{feedbackMessages[rating - 1]}</p>
            {rating === 1 && (
              <button
                className="mt-2 text-sm text-blue-600 underline"
                onClick={() => window.open('mailto:zainvicee@gmail.com', '_blank')}
              >
                Contact Support
              </button>
            )}
          </div>
        )}

        <textarea
          className="w-full mt-4 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#1EBDB8]"
          rows="4"
          placeholder="Write your comments here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="mt-4 w-full flex justify-center items-center px-4 py-2 bg-[#1EBDB8] hover:bg-white hover:text-[#1EBDB8] transition-all duration-300 text-white rounded-full border shadow-md"
          disabled={isSubmitting || rating === 0}
        >
          {isSubmitting ? <Spinner /> : 'Submit Review'}
        </button>
      </div>
    </div>
  );
};

export default LeaveReviewOverlay;