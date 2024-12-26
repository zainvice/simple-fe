import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, verifyOTP } from '../../api/features/auth/patient/authSlice';
import Spinner from '../../common/spinner';
import { useNavigate } from 'react-router-dom';

const Verificationoverlay = ({onClose, phone, email, role}) => {

      const [isPhoneVerification, setPhoneVerification] = useState()
      const [formData, setFormData] = useState({
        email: email,
        phone, phone,
        otp: '',
        role: role
      });
      const navigate = useNavigate();
        
      const dispatch = useDispatch();
      const { loading, error } = useSelector((state) => state.auth);
      const [otpSender, setOTPSender] = useState(``)
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async(e, state) => {
        e.preventDefault();
      
        if(state==='Resend OTP'){
          try {
              const actionResult = await dispatch(loginUser({ formData }));
        
              console.log(actionResult)
              if (loginUser.fulfilled.match(actionResult)) {
                
                const response = actionResult.payload; 
                console.log('OTP Sucessfully sent', response);
                setOTPSend(true)
                if(state==='Resend OTP'){
                  setOTPSender(`We sent a code to ${formData?.email} again. To keep your account safe, do not share this code with anyone`)
                  setLoginError('')
              }
                
              } else if(loginUser.rejected.match(actionResult)){
                const response = actionResult.payload; 
                console.log('Sign Up error', response);
              }
            } catch (error) {
             
              console.error('Error during loginUser:', error);
            }
         }else {
          try {
              const actionResult = await dispatch(verifyOTP({ formData }));
        
              console.log(actionResult)
              if (verifyOTP.fulfilled.match(actionResult)) {
                
                  const response = actionResult.payload; 
                  console.log('Verified OTP', response);
                  
                  navigate('/provider/dashboard');
                  
              } else if(verifyOTP.rejected.match(actionResult)){
                const response = actionResult.payload; 
                console.log('OTP Verification error', response);
              }
            } catch (error) {
             
              console.error('Error during verifyOTP:', error);
            }
         }
       
        
      };
    const [verificationError, setVerificationError] = useState('')
    useEffect(()=>{
        if(error==='User already exists with this emailAddress.'){
          setVerificationError("This email is already associated with an account.")
        } else if (error === 'Failed to fetch'){
          setVerificationError("Unable to connect to the server.")
        }else if (error === 'Invalid or expired OTP.'){
          setVerificationError("You've entered an invalid OTP. Make sure it's correct.")
          setOTPSender('')
        }
  
    }, [error])

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex text-left items-center justify-center z-30">

             <div className="bg-[#FFFFFF] text-[#1E232F] rounded-[10px] shadow-lg p-8 lg:w-[600px] md:w-[500px] w-[350px] relative">
             <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                        >
                        X
                    </button>
                <h2 className="text-[24px] font-medium">Enter the 6 digit code</h2>
                {verificationError && <p className="text-red-600 my-2 flex"><span className="material-symbols-outlined mr-2"> error </span>{verificationError}</p>} 
                <p className="text-[14px] text-[#707271] mb-4">{otpSender}</p>
                <div className="mb-4 text-[#707271]">
                    <label className=" font-semibold block text-sm font-medium mb-2" htmlFor="email">
                        Verification Code
                    </label>
                    <input
                        type="number"
                        id="otp"
                        name="otp"
                    
                        className="w-full p-3 bg-[#F5F5F5] rounded-[10px]"
                        placeholder="------"
                        value={formData.otp}
                        onChange={handleChange}
                        required
                    />
                    </div>
                 <p className="text-[14px] text-[#707271] mb-4">Didn’t receive your code? <span className='font-semibold text-[#1EBDB8] underline' onClick={(e)=> handleSubmit(e, 'Resend OTP')}>Resend Code</span></p>
                 <button
                    type="submit"
                    className="w-full py-2 px-4 bg-[#1EBDB8] border border-[#1EBDB8] text-white rounded-[20px] font-bold hover:text-[#1EBDB8] hover:bg-transparent transition"
                    onClick={handleSubmit}
                    >
                     {loading ? <Spinner/> : 'Continue'}
                </button>
                 <button
                    type="submit"
                    className="w-full py-2 px-4 bg-transparent text-[#888888] font-medium mt-4"
                    >
                    Verify with {isPhoneVerification? 'email': 'phone'} instead
                </button>
               
              
                </div>
        </div>
    );
}

export default Verificationoverlay;