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
      const navigate = useNavigate(); 
        
      const dispatch = useDispatch();
      const { loading, error } = useSelector((state) => state.auth);
      const [otpSender, setOTPSender] = useState(``)
    
      const [loginError, setLoginError] = useState('')
      const [isPhoneVerification, setPhoneVerification] = useState()
      const [isOTPSend, setOTPSend] = useState(false)

      const handlePhoneVerification = () => {
        setPhoneVerification(!isPhoneVerification)
      }
    
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
                
                navigate('/patient/dashboard');
                
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
        if(error==='User already exists with this emailAddress.'){
          setLoginError("This email is already associated with an account.")
        } else if (error === 'Failed to fetch'){
          setLoginError("Unable to connect to the server.")
        }else if (error === 'Invalid or expired OTP.'){
          setLoginError("You've entered an invalid OTP. Make sure it's correct.")
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
                    <p className="text-[14px] text-[#707271] mb-4">Didn’t receive your code? <span className='font-semibold text-[#1EBDB8] underline cursor-pointer' onClick={(e)=> handleSubmit(e, 'Resend OTP')}>Resend Code</span></p>
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