import React, {useState} from 'react';

import Button from '../../common/button';
import Loginoverlay from '../../common/loginoverlay';
import Verificationoverlay from '../../common/verificationoverlay';



const AuthPage = () => {
  const [isLoginOpen, setLoginOpen] = useState(false) 
  const [isVerificationOpen, setVerificationOpen] = useState(false) 
  const [isStepComplete, setStep] = useState(false) 
  const [isPhoneProvided, setPhoneProvided] = useState(true)

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
    phone: '',
    dob: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if(name==='phone'){
      if(value!=''){
          setPhoneProvided(true)
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setStep(true)
    if(isStepComplete){
      console.log('Form submitted:', formData);
      setVerificationOpen(true)
    }
    //
  };

  return (
    <div className="flex flex-col h-screen poppins bg-[#FFFFFF] text-center">
      {isLoginOpen&&<Loginoverlay onClose={onOpenCloseLogin}/>}
      {isVerificationOpen&&<Verificationoverlay onClose={onOpenCloseVerification} email={formData.email}/>}
     {isStepComplete?(
      <>
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
      </>
     ):(
      <>
        <div className='w-full flex justify-between lg:p-8 p-4'>
          <a className='flex lg:ml-6' href='/'>
          <img src="./logodark-icon.png" alt="Logo" className="h-12 lg:ml-6 ml-3" />
          <p className='hidden lg:block text-[28px] ml-2 text-[#1EBDB8] font-medium'>Simple</p>
          </a>
          <div className='flex text-[#888888] mr-5'>
            <div className='flex text-[#888888] mt-2'>
              <span class="material-symbols-outlined mx-2"> lock </span>
              Protected
            </div>
            <div className='mx-2 mt-2'>
              |
            </div>
            <div>
              <Button text={'SIGN IN'} onClick={onOpenCloseLogin}/>
            </div>
          </div>
      </div>
      <p className='text-[40px] text-[#707271]'>Create an <span className='text-[#1EBDB8] font-bold'>Account</span></p>
      <div className="lg:max-w-lg mx-auto p-6 text-[#707271] text-left mt-3">
        <h2 className="text-xl font-400 mb-4 text-[34px]">Tell us about yourself</h2>
        <p className="text-gray-500 text-sm mb-6">
          To book your appointment, we need to verify a few things
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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
          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <label className=" font-semibold block text-sm font-medium mb-2" htmlFor="firstName">
                First Legal Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full p-3 bg-[#F5F5F5] rounded"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <label className=" font-semibold block text-sm font-medium mb-2" htmlFor="lastName">
                Last Legal Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full p-3 bg-[#F5F5F5] rounded"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className=" font-semibold block text-sm font-medium mb-2" htmlFor="dob">
              Date of birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              className="w-full p-3 bg-[#F5F5F5] rounded"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className=" font-semibold block text-sm font-medium mb-2">Gender</label>
            <div className="flex items-center gap-4">
              <label className=" font-semibold flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  className="mr-2"
                  checked={formData.gender === 'Male'}
                  onChange={handleChange}
                  required
                />
                Male
              </label>
              <label className=" font-semibold flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  className="mr-2"
                  checked={formData.gender === 'Female'}
                  onChange={handleChange}
                  required
                />
                Female
              </label>
            </div>
            <p className="text-sm text-[#333333] font-bold underline mt-2 cursor-pointer">
              Add more sex and gender info <span className=' font-normal no-underline'>(optional)</span>
            </p>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#1EBDB8] border border-[#1EBDB8] text-white rounded-[20px] font-bold hover:text-[#1EBDB8] hover:bg-transparent transition"
          >
            Continue
          </button>
        </form>
        <div className="my-2 text-center text-gray-400">Or</div>
        <div className="flex flex-col gap-2 mb-4">
          <button className="flex-1 py-2 px-4 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition">
            <img src="google-logo.png" alt="Google" className="w-5 h-5 mr-2" />
            Continue with Google
          </button>
          <button className="flex-1 py-2 px-4 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition">
            <img src="apple-logo.png" alt="Apple" className="w-5 h-5 mr-2" />
            Continue with Apple
          </button>
        </div>
      </div>
      </>
     )}

    </div>
  );
};

export default AuthPage;
