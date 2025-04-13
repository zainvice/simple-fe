import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, verifyOTP } from '../../api/features/auth/patient/authSlice';
import Spinner from '../../common/spinner';
import { useNavigate } from 'react-router-dom';

const Verificationoverlay = ({ onClose, phone, email, role }) => {
  const [isPhoneVerification, setPhoneVerification] = useState(false);
  const [formData, setFormData] = useState({
    email: email,
    phone: phone,
    otp: '',
    role: role
  });
  const [otpSender, setOTPSender] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

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
  useEffect(()=>{
          if(formData.email){
              setOTPSender(`We sent a code to ${formData?.email}. To keep your account safe, do not share this code with anyone`)
          }
  },[formData])

  const handleSubmit = async (e, state) => {
    e.preventDefault();

    if (state === 'Resend OTP' && !isTimerActive) {
      try {
        const actionResult = await dispatch(loginUser({ formData }));
        if (loginUser.fulfilled.match(actionResult)) {
          setOTPSender(`We sent a code to ${formData?.email} again. Do not share this code with anyone.`);
          setResendTimer(60);
          setIsTimerActive(true);
        }
      } catch (error) {
        console.error('Error during loginUser:', error);
      }
    } else {
      try {
        const actionResult = await dispatch(verifyOTP({ formData }));
        if (verifyOTP.fulfilled.match(actionResult)) {
          navigate('/provider/dashboard');
        }
      } catch (error) {
        console.error('Error during verifyOTP:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white text-gray-900 rounded-lg shadow-lg p-8 text-left w-[350px] md:w-[500px] lg:w-[600px] relative">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>X</button>
        <h2 className="text-2xl font-medium">Enter the 6-digit code</h2>
        {error && <p className="text-red-600 my-2">{error}</p>}
        <p className="text-sm text-gray-600 mb-4">{otpSender}</p>
        <div className="mb-4 text-gray-600">
          <label className="font-semibold block text-sm mb-2" htmlFor="otp">Verification Code</label>
          <div className="flex justify-between mx-10 gap-2">
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
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Didn’t receive your code?{' '}
          {isTimerActive ? (
            <span className="text-gray-400">Resend in {resendTimer}s</span>
          ) : (
            <span className="font-semibold text-[#1EBDB8] underline cursor-pointer" onClick={(e) => handleSubmit(e, 'Resend OTP')}>
              Resend Code
            </span>
          )}
        </p>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-[#1EBDB8] text-white rounded-lg font-bold hover:bg-teal-500 transition"
          onClick={handleSubmit}
        >
          {loading ? <Spinner /> : 'Continue'}
        </button>
        <button
          type="button"
          className="w-full py-2 px-4 text-gray-600 font-medium mt-4"
          onClick={() => setPhoneVerification(!isPhoneVerification)}
        >
          Verify with {isPhoneVerification ? 'email' : 'phone'} instead
        </button>
      </div>
    </div>
  );
};

export default Verificationoverlay;
