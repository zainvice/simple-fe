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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-white text-gray-900 rounded-lg shadow-lg p-8 w-[350px] md:w-[500px] lg:w-[600px] relative">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={onClose}>X</button>
        <h2 className="text-2xl font-medium">Enter the 6-digit code</h2>
        {error && <p className="text-red-600 my-2">{error}</p>}
        <p className="text-sm text-gray-600 mb-4">{otpSender}</p>
        <div className="mb-4 text-gray-600">
          <label className="font-semibold block text-sm mb-2" htmlFor="otp">Verification Code</label>
          <input
            type="number"
            id="otp"
            name="otp"
            className="w-full p-3 bg-gray-200 rounded-lg"
            placeholder="------"
            value={formData.otp}
            onChange={handleChange}
            required
          />
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Didn’t receive your code?{' '}
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
          className="w-full py-2 px-4 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-500 transition"
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
