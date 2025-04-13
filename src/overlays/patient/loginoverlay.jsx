import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, verifyOTP } from '../../api/features/auth/patient/authSlice';
import Spinner from '../../common/spinner';
import { useNavigate } from 'react-router-dom';

const Loginoverlay = ({onClose}) => {
      const [formData, setFormData] = useState({
        email: '',
        otp: '',
        role: 'user'
      });
      const navigate = useNavigate(); // If you're using react-router
        
      const dispatch = useDispatch();
      const { loading, error } = useSelector((state) => state.auth);
      const { user, accessToken } = useSelector((state) => state.auth);
      const [otpSender, setOTPSender] = useState(``)
      useEffect(()=>{
        if(user&&accessToken){
            navigate(`/patient/dashboard`)
        }
       
    },[user])
    
      const [loginError, setLoginError] = useState('')
      const [isPhoneVerification, setPhoneVerification] = useState()
      const [isOTPSend, setOTPSend] = useState(false)
      const [resendTimer, setResendTimer] = useState(60);
      const [isTimerActive, setIsTimerActive] = useState(true);

      const handlePhoneVerification = () => {
        setPhoneVerification(!isPhoneVerification)
      }
    
      useEffect(() => {
        let timer;
        if (isTimerActive && resendTimer > 0) {
          timer = setInterval(() => {
            setResendTimer((prev) => prev - 1);
          }, 1000);
        } else if (resendTimer === 0) {
          setIsTimerActive(false);
        }
        return () => clearInterval(timer);
      }, [isTimerActive, resendTimer]);
    
      
      useEffect(()=>{
        if(formData.email){
            setOTPSender(`We sent a code to ${formData?.email}. To keep your account safe, do not share this code with anyone`)
        }
      },[formData])
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setLoginError('')
      };
      const handleOTPChange = (e, index) => {
        const value = e.target.value.replace(/\D/, ""); // Only digits
        if (!value) return;
      
        const otp = formData.otp.split("");
        otp[index] = value;
      
        setFormData({
          ...formData,
          otp: otp.join(""),
        });
      
        // Move to next input
        if (e.target.nextSibling) {
          e.target.nextSibling.focus();
        }
      };
    const handleSubmit = async(e, state) => {
        e.preventDefault();
       if(!isOTPSend||state==='Resend OTP'){
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
                setResendTimer(60);
                setIsTimerActive(true);
            }
              
            } else if(loginUser.rejected.match(actionResult)){
              const response = actionResult.payload; 
              console.log('Sign Up error', response);
            }
          } catch (error) {
           
            console.error('Error during loginUser:', error);
          }
       }else if(isOTPSend){
        try {
            const actionResult = await dispatch(verifyOTP({ formData }));
      
            console.log(actionResult)
            if (verifyOTP.fulfilled.match(actionResult)) {
              
                const response = actionResult.payload; 
                console.log('Verified OTP', response);
                
                const role = response?.message?.user?.role;

                // Map roles to their respective dashboards
                const roleToRouteMap = {
                  user: '/patient/dashboard',
                  provider: '/provider/dashboard',
                  admin: '/admin/dashboard'
                };
              
                const route = roleToRouteMap[role] || '/';
                navigate(route);
                
            } else if(verifyOTP.rejected.match(actionResult)){
              const response = actionResult.payload; 
              console.log('OTP Verification error', response);
            }
          } catch (error) {
           
            console.error('Error during verifyOTP:', error);
          }
       }
        
    };
    useEffect(()=>{
        if(error==='User already exists with this email.'){
          setLoginError("This email is already associated with an account.")
        } else if (error === 'Failed to fetch'){
          setLoginError("Unable to connect to the server.")
        }else if (error === 'Invalid or expired OTP.'){
          setLoginError("You've entered an invalid OTP. Make sure it's correct.")
          setOTPSender('')
        }
        else if (error === 'User not found!'){
          setLoginError("User not registered. Please use sign up.")
          setOTPSender('')
        }
  
    }, [error])
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex text-left items-center justify-center z-10" >

            {isOTPSend? 
                <div className="bg-[#FFFFFF] text-[#1E232F] rounded-[10px] shadow-lg p-8 lg:w-[600px] md:w-[500px] w-[350px] relative">
                    <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                        >
                        X
                    </button>
                    <h2 className="text-[24px] font-medium">Enter the 6 digit code</h2>
                    {loginError && <p className="text-red-600 my-2 flex"><span className="material-symbols-outlined mr-2"> error </span>{loginError}</p>} 
                    <p className="text-[14px] text-[#707271] mb-4">{otpSender}</p>
                    <div className="flex justify-between mx-10 gap-2 mb-4">
                          {[...Array(6)].map((_, index) => (
                            <input
                              key={index}
                              type="text"
                              inputMode="numeric"
                              maxLength="1"
                              className="w-12 h-12 text-center text-xl bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1EBDB8] transition"
                              value={formData.otp[index] || ""}
                              onChange={(e) => handleOTPChange(e, index)}
                              onFocus={(e) => e.target.select()}
                            />
                          ))}
                        </div>
                    <p className="text-[14px] text-[#707271] mb-4">Didn’t receive your code? 
                    {isTimerActive ? (
                        <span className="text-gray-400">Resend in {resendTimer}s</span>
                      ) : (
                        <span className="font-semibold text-teal-600 underline cursor-pointer" onClick={(e) => handleSubmit(e, 'Resend OTP')}>
                          Resend Code
                        </span>
                      )}
                    </p>
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
            
            
            : 
            <div className="bg-[#FFFFFF] z-10 text-[#1E232F] rounded-[10px] shadow-lg p-8 lg:w-[600px] md:w-[500px] w-[350px] relative">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                    >
                    X
                </button>
                <h2 className="text-[24px] font-medium mb-4">To log in, enter your email address</h2>
                {loginError && <p className="text-red-600 my-2 flex"><span className="material-symbols-outlined mr-2"> error </span>{loginError}</p>} 
                <div className="mb-4 text-[#707271]">
                    <label className=" font-semibold block text-sm font-medium mb-2" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full p-3 bg-[#F5F5F5] rounded-[10px]"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-[#1EBDB8] border border-[#1EBDB8] text-white rounded-[20px] font-bold hover:text-[#1EBDB8] hover:bg-transparent transition"
                    onClick={handleSubmit}
                    >
                    {loading ? <Spinner/> : 'Continue'}
                </button>
                <div className="my-2 text-center text-gray-400">Or</div>
                <div className="flex flex-col gap-2 mb-4">
                    <button className="flex-1 py-2 px-4 border border-[[#1E232F] rounded-[10px] flex items-center justify-center hover:bg-gray-100 transition">
                    <img src="/google-logo.png" alt="Google" className="w-5 h-5 mr-2" />
                    Continue with Google
                    </button>
                    <button className="flex-1 py-2 px-4 border border-[[#1E232F] rounded-[10px] flex items-center justify-center hover:bg-gray-100 transition">
                    <img src="/apple-logo.png" alt="Apple" className="w-5 h-5 mr-2" />
                    Continue with Apple
                    </button>
                </div>
            </div>
            
            }
            
        </div>
    );
}

export default Loginoverlay;