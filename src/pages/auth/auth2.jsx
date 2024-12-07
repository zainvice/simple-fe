import React, {useState} from 'react';

import Button from '../../common/button';
import Loginoverlay from '../../common/loginoverlay';
import Verificationoverlay from '../../common/verificationoverlay';



const AuthPage = () => {
  const [isLoginOpen, setLoginOpen] = useState(false) 
  const [isVerificationOpen, setVerificationOpen] = useState(false) 

  const onOpenCloseLogin = () =>{
    setLoginOpen(!isLoginOpen)
  }
  const onOpenCloseVerification = () =>{
    setVerificationOpen(!isVerificationOpen)
  }

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setVerificationOpen(true)
  };

  return (
    <div className="flex flex-col h-screen poppins bg-[#FFFFFF] text-center">
      {isLoginOpen&&<Loginoverlay onClose={onOpenCloseLogin}/>}
      {isVerificationOpen&&<Verificationoverlay onClose={onOpenCloseVerification} email={formData.email}/>}
     <div className='w-full flex justify-between lg:p-8 p-4'>
        <a className='flex lg:ml-6' href='/'>
         <img src="./logodark-icon.png" alt="Logo" className="h-12 lg:ml-6 ml-3" />
         <p className='hidden lg:block text-[28px] ml-2 text-[#1EBDB8] font-medium'>Simple</p>
        </a>
        
     </div>
     <p className='text-[40px] text-[#707271]'>Verifying <span className='text-[#1EBDB8] font-bold'>Account</span></p>
     <div className="mx-auto p-6 text-[#707271] text-left mt-3">
      <h2 className="font-medium text-[32px]">Enter your mobile phone number</h2>
      <p className="text-gray-500 text-sm mb-4">
        We'll text you to verify your account
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          
          <input
            type="phone"
            id="phone"
            name="phone"
            className="w-full p-3 bg-[#F5F5F5] rounded-[10px]"
            placeholder="(___) ___ - ____"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex max-w-lg text-justify mb-4'>
          <input type="checkbox" name="terms" id="terms" required className='-mt-10 w-8'/>
          <p className='ml-2 text-sm'>I have read and accept Simple's Terms of Use  and I consent to Simple collecting data, including sensitive information such as health data (as fully described in the Privacy Policy)</p>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-[#1EBDB8] border border-[#1EBDB8] text-white rounded-[20px] font-bold hover:text-[#1EBDB8] hover:bg-transparent transition"
        >
          Continue
        </button>
        
      </form>
      <button
                   
            className="w-full py-2 px-4 bg-transparent text-[#888888] font-semibold my-4 hover:text-[#1E232F] duration-300"
            >
            Verify with email instead
        </button>
        <div className='max-w-lg text-[#888888] text-center font-normal'>
           <p className='ml-2 text-[15px]'>By clicking "Send verification text" you agree to receive account updates and appointment reminders via text from Simple. Message frequency varies. Reply STOP to cancel or HELP for help. Message and data rates may apply.</p>
        </div>
      
    </div>

    </div>
  );
};

export default AuthPage;
