import React, { useState } from 'react';

const Verificationoverlay = ({onClose, phone, email}) => {

    const [isPhoneVerification, setPhoneVerification] = useState()
    const [formData, setFormData] = useState({
        verificationCode: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
      };
      const handlePhoneVerification = () => {
        setPhoneVerification(!isPhoneVerification)
      }
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex text-left items-center justify-center" onClick={onClose}>
             <div className="bg-[#FFFFFF] text-[#1E232F] rounded-[10px] shadow-lg p-8 lg:w-[600px] md:w-[500px] w-[350px]">
                <h2 className="text-[24px] font-medium">Enter the 6 digit code</h2>
                <p className="text-[14px] text-[#707271] mb-4">We sent a code to {/* {isPhoneVerification? {phone}: {email}} */}. To keep your account safe, do not share this code with anyone</p>
                <div className="mb-4 text-[#707271]">
                    <label className=" font-semibold block text-sm font-medium mb-2" htmlFor="email">
                        Verification Code
                    </label>
                    <input
                        type="number"
                        id="verificationCode"
                        name="verificationCode"
                    
                        className="w-full p-3 bg-[#F5F5F5] rounded-[10px]"
                        placeholder="------"
                        value={formData.verificationCode}
                        onChange={handleChange}
                        required
                    />
                    </div>
                 <p className="text-[14px] text-[#707271] mb-4">Didn’t receive your code? <span className='font-semibold text-[#1EBDB8] underline'>Resend Code</span></p>
                 <button
                    type="submit"
                    className="w-full py-2 px-4 bg-[#1EBDB8] border border-[#1EBDB8] text-white rounded-[20px] font-bold hover:text-[#1EBDB8] hover:bg-transparent transition"
                    >
                    Continue
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