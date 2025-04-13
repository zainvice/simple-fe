import React, {useEffect, useState} from 'react';
import Button from '../../../common/button';
import Verificationoverlay from '../../../overlays/provider/verificationoverlay';
import ProviderPracticesDropdown from '../../../dropdowns/provider/providerspecialtyselector';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup, loginUser } from '../../../api/features/auth/patient/authSlice';
import { sendOTP } from '../../../api/features/auth/patient/authSlice';
import Spinner from '../../../common/spinner';



const ProviderAuthPage = () => {
  const [isLoginOpen, setLoginOpen] = useState(false) 
  const practices = [
    {
        name: "Primary Care Physician (PCP)",
        subtypes: [
            "Family Medicine Physician"
        ]
    },
    {
        name: "OB-GYN (Obstetrician-Gynecologist)",
        subtypes: [
            "Maternal-Fetal Medicine Specialist",
            "Reproductive Endocrinologist",
            "Gynecologic Oncologist",
            "Urogynecologist"
        ]
    },
    {
        name: "Dermatologist",
        subtypes: [
            "Pediatric Dermatologist",
            "Cosmetic Dermatologist",
            "Mohs Surgeon",
            "Medical Dermatologist"
        ]
    },
    {
        name: "Dentist",
        subtypes: [
            "Pediatric Dentist",
            "Orthodontist",
            "Oral Surgeon",
            "Prosthodontist"
        ]
    },
    {
        name: "Ear, Nose & Throat Doctor (ENT / Otolaryngologist)",
        subtypes: [
            "Head and Neck Surgeon",
            "Pediatric ENT",
            "Rhinologist",
            "Otologist / Neurotologist"
        ]
    },
    {
        name: "Eye Doctor",
        subtypes: [
            "Ophthalmologist",
            "Optometrist"
        ]
    },
    {
        name: "Psychiatrist",
        subtypes: [
            "Child and Adolescent Psychiatrist",
            "Forensic Psychiatrist",
            "Geriatric Psychiatrist",
            "Addiction Psychiatrist"
        ]
    },
    {
        name: "Orthopedic Surgeon (Orthopedist)",
        subtypes: [
            "Sports Medicine Orthopedist",
            "Spine Surgeon",
            "Joint Replacement Surgeon",
            "Pediatric Orthopedist",
            "Hand Surgeon"
        ]
    },
    {
        name: "Acupuncturist",
        subtypes: []
    },
    {
        name: "Allergist (Immunologist)",
        subtypes: []
    },
    {
        name: "Audiologist",
        subtypes: []
    },
    {
        name: "Cardiologist (Heart Doctor)",
        subtypes: [
            "Interventional Cardiologist",
            "Electrophysiologist",
            "Heart Failure Specialist",
            "Preventive Cardiologist",
            "Cardiac Imaging Specialist"
        ]
    },
    {
        name: "Cardiothoracic Surgeon",
        subtypes: []
    },
    {
        name: "Chiropractor",
        subtypes: []
    },
    {
        name: "Colorectal Surgeon",
        subtypes: []
    },
    {
        name: "Dietitian / Nutritionist",
        subtypes: []
    },
    {
        name: "Endocrinologist (incl Diabetes Specialists)",
        subtypes: [
            "Pediatric Endocrinologist",
            "Reproductive Endocrinologist"
        ]
    },
    {
        name: "Gastroenterologist",
        subtypes: [
            "Pediatric Gastroenterologist",
            "Advanced Endoscopist",
            "Hepatologist"
        ]
    },
    {
        name: "Geriatrician",
        subtypes: []
    },
    {
        name: "Hematologist (Blood Specialist)",
        subtypes: [
            "Hematologic Oncologist",
            "Pediatric Hematologist"
        ]
    },
    {
        name: "Hospice and Palliative Medicine Specialist",
        subtypes: []
    },
    {
        name: "Infectious Disease Specialist",
        subtypes: [
            "HIV Specialist",
            "Tropical Medicine Specialist",
            "Travel Medicine Specialist"
        ]
    },
    {
        name: "Infertility Specialist",
        subtypes: []
    },
    {
        name: "Midwife",
        subtypes: []
    },
    {
        name: "Naturopathic Doctor",
        subtypes: []
    },
    {
        name: "Nephrologist (Kidney Specialist)",
        subtypes: []
    },
    {
        name: "Neurologist (incl Headache Specialists)",
        subtypes: [
            "Vascular Neurologist",
            "Epileptologist",
            "Headache Specialist",
            "Pediatric Neurologist",
            "Neuroimmunologist"
        ]
    },
    {
        name: "Neurosurgeon",
        subtypes: [
            "Spine Surgeon",
            "Pediatric Neurosurgeon",
            "Neuro-oncologist"
        ]
    },
    {
        name: "Oncologist",
        subtypes: []
    },
    {
        name: "Ophthalmologist",
        subtypes: [
            "Retina Specialist",
            "Cornea Specialist",
            "Glaucoma Specialist",
            "Pediatric Ophthalmologist",
            "Oculoplastic Surgeon"
        ]
    },
    {
        name: "Optometrist",
        subtypes: []
    },
    {
        name: "Oral Surgeon",
        subtypes: []
    },
    {
        name: "Orthodontist",
        subtypes: []
    },
    {
        name: "Pain Management Specialist",
        subtypes: []
    },
    {
        name: "Pediatric Dentist",
        subtypes: []
    },
    {
        name: "Pediatrician",
        subtypes: [
            "Developmental Pediatrician",
            "Neonatologist",
            "Pediatric Cardiologist",
            "Pediatric Endocrinologist",
            "Pediatric Hematologist-Oncologist"
        ]
    },
    {
        name: "Physiatrist (Physical Medicine)",
        subtypes: [
            "Pain Management Specialist",
            "Sports Medicine Specialist",
            "Spinal Cord Injury Specialist",
            "Pediatric Physiatrist"
        ]
    },
    {
        name: "Physical Therapist",
        subtypes: []
    },
    {
        name: "Plastic Surgeon",
        subtypes: [
            "Cosmetic Surgeon",
            "Reconstructive Surgeon",
            "Hand Surgeon",
            "Craniofacial Surgeon"
        ]
    },
    {
        name: "Podiatrist (Foot and Ankle Specialist)",
        subtypes: [
            "Surgical Podiatrist",
            "Sports Medicine Podiatrist",
            "Pediatric Podiatrist"
        ]
    },
    {
        name: "Prosthodontist",
        subtypes: []
    },
    {
        name: "Psychologist",
        subtypes: []
    },
    {
        name: "Pulmonologist (Lung Doctor)",
        subtypes: [
            "Critical Care Pulmonologist",
            "Sleep Medicine Specialist",
            "Pediatric Pulmonologist"
        ]
    },
    {
        name: "Radiologist",
        subtypes: [
            "Diagnostic Radiologist",
            "Interventional Radiologist",
            "Nuclear Medicine Specialist",
            "Breast Imaging Specialist"
        ]
    },
    {
        name: "Rheumatologist",
        subtypes: []
    },
    {
        name: "Sleep Medicine Specialist",
        subtypes: []
    },
    {
        name: "Sports Medicine Specialist",
        subtypes: []
    },
    {
        name: "Surgeon",
        subtypes: [
            "General Surgeon",
            "Trauma Surgeon",
            "Bariatric Surgeon",
            "Vascular Surgeon",
            "Thoracic Surgeon"
        ]
    },
    {
        name: "Therapist / Counselor",
        subtypes: []
    },
    {
        name: "Urgent Care Specialist",
        subtypes: []
    },
    {
        name: "Urological Surgeon",
        subtypes: [
            "Pediatric Urologist",
            "Oncologic Urologist",
            "Female Pelvic Medicine Specialist"
        ]
    }
  ];

  const [errors, setErrors] = useState({
    zipCode: '',
    phone: '',
  });
  const validateZipCode = (zipCode) => {
    // US Zip Code: 5 digits or 5 digits + 4 (e.g., 90210 or 90210-1234)
    const zipCodeRegex = /^\d{5}(-\d{4})?$/;
    return zipCodeRegex.test(zipCode);
  };

  const validatePhone = (phone) => {
    // US Phone Number: (XXX) XXX-XXXX or XXX-XXX-XXXX
    const phoneRegex = /^(?:\(\d{3}\)\s?|\d{3}-)\d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  };
  const { type } = useParams()
  const [selectedItems, setSelectedItems] = useState([]);

  const [isVerificationOpen, setVerificationOpen] = useState(false) 
  const [isStepComplete, setStep] = useState(false) 
  const [isPhoneProvided, setPhoneProvided] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const { user, accessToken } = useSelector((state) => state.auth);
  useEffect(()=>{
    if(user&&accessToken){
        navigate(`/provider/dashboard`)
    }
   
  },[user])
      

  const [signupError, setSignupError] = useState('')
  const [dobError, setdobError] = useState('');

  const onOpenCloseLogin = () =>{
    setLoginOpen(!isLoginOpen)
  }
  const onOpenCloseVerification = () =>{
    setVerificationOpen(!isVerificationOpen)
  }

  const [selectedPractices, setSelectedPractices] = useState([]);

  const handleSelect = (e) => {
    const value = e.target.value;

    // Check if already selected or max limit reached
    if (
      selectedPractices.includes(value) ||
      selectedPractices.length >= 3
    ) {
      return;
    }

    setSelectedPractices([...selectedPractices, value]);
  };

  const handleRemove = (practice) => {
    setSelectedPractices(selectedPractices.filter((item) => item !== practice));
  };

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    practiceName: '',
    practiceSize: '1',
    specialty: selectedItems,
    avatar: 'https://images.vexels.com/media/users/3/151709/isolated/preview/098c4aad185294e67a3f695b3e64a2ec-doctor-avatar-icon.png?w=360',
    zipCode: '',
    reference: '',
    role: 'provider',
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
  useEffect(()=>{
    if(selectedItems){
      setFormData({ ...formData, specialty: selectedItems });
    }
  },[selectedItems])
  useEffect(()=>{
     console.log(formData)
  },[formData])

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;

    // Remove all non-numeric characters
    let formattedValue = value.replace(/\D/g, '');

    // Format phone number as (XXX) XXX-XXXX or XXX-XXX-XXXX
    if (formattedValue.length <= 3) {
      formattedValue = formattedValue.replace(/(\d{1,3})/, '($1');
    } else if (formattedValue.length <= 6) {
      formattedValue = formattedValue.replace(/(\d{3})(\d{1,3})/, '($1) $2');
    } else {
      formattedValue = formattedValue.replace(/(\d{3})(\d{3})(\d{1,4})/, '($1) $2-$3');
    }

    // Update state with formatted phone number
    setFormData({ ...formData, [name]: formattedValue });
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const zipCodeValid = validateZipCode(formData.zipCode);
    const phoneValid = validatePhone(formData.phone);

    if (!zipCodeValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        zipCode: 'Please enter a valid Zip Code (e.g., 90210 or 90210-1234).',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, zipCode: '' }));
    }

    if (!phoneValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: 'Please enter a valid US phone number (e.g., (123) 456-7890).',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
    }

    // If all fields are valid, proceed with form submission
    if (zipCodeValid && phoneValid) {
     
        try {
          const actionResult = await dispatch(signup({ formData }));
    
          console.log(actionResult)
          if (signup.fulfilled.match(actionResult)) {
            
            const response = actionResult.payload; 
            console.log('Signup partially done!', response);
            setSignupError('')
            try {
              const actionResult = await dispatch(sendOTP({ formData }));
        
              console.log(actionResult)
              if (sendOTP.fulfilled.match(actionResult)) {
               
                const response = actionResult.payload; 
                console.log('SendOTP successful:', response);
                setVerificationOpen(true)
                setSignupError('')
                
              } else if(sendOTP.rejected.match(actionResult)){
                const response = actionResult.payload; 
                console.log('Sign Up error', response);
              }
            } catch (error) {
             
              console.error('Error during signup:', error);
            }
            
          } else if(signup.rejected.match(actionResult)){
            const response = actionResult.payload; 
            console.log('Sign Up error', response);
            setSignupError("Something went wrong, please try again later.")
          }
        } catch (error) {
         
          console.error('Error during signup:', error);
          setSignupError("Something went wrong, please try again later.")
        }
      

       
    }
    
  };
  const handleLogin = async(e) => {
      e.preventDefault();
     
        try {
            const actionResult = await dispatch(loginUser({ formData }));
      
            console.log(actionResult)
            if (loginUser.fulfilled.match(actionResult)) {
              
              const response = actionResult.payload; 
              console.log('OTP Sucessfully sent', response);
              setVerificationOpen(true)
              setSignupError('')
            
              
            } else if(loginUser.rejected.match(actionResult)){
              const response = actionResult.payload; 
              console.log('Sign Up error', response);
            }
          } catch (error) {
          
            console.error('Error during loginUser:', error);
          }
      
        
    };
  useEffect(()=>{
    if(error==='User already exists with this emailAddress.'){
      setSignupError("This email is already associated with an account.")
    } else if (error === 'Failed to fetch'){
      setSignupError("Unable to connect to the server.")
    }
    else if (error === 'Role not authorized'){
      setSignupError("This account is registered as a patient, please use the correct authentication.")
    }
    else if (error === 'User not found!'){
      setSignupError("User not registered. Please use sign up.")
      setOTPSender('')
    }

}, [error])

  return (
    <div className="flex flex-col poppins bg-[#FFFFFF] text-center h-screen overflow-y-auto">
  
      {isVerificationOpen&&<Verificationoverlay onClose={onOpenCloseVerification} email={formData.email} phone={formData.phone} role={formData.role}/>}

      <div className='w-full flex justify-between lg:p-8 p-4 sticky top-0 bg-white z-20'>
          <a className='flex lg:ml-6' href='/'>
          <img src="/logodark-icon.png" alt="Logo" className="h-12 lg:ml-6 ml-3" />
          <p className='hidden lg:block text-[28px] ml-2 text-[#1EBDB8] font-medium'>Simple</p>
           <p className='text-[#707271] ml-2 mt-3'>for Providers</p>
          </a>
          <div className='flex text-[#888888] mr-5'>
            <div className='flex text-[#888888] mt-2 cursor-pointer' onClick={(e)=> window.location.href = '/'}>
            
              Find Care
            </div>
            {type!='login'&& 
            <div className='mx-2 mt-2'>
              |
            </div>
            }
           {type!='login'&& 
             <div>
              <Button text={'SIGN IN'} onClick={(e)=> window.location.href = '/auth/provider/login'}/>
            </div>
            }
            <div className='ml-6 '>
              <button className='px-3 py-2 border-2 border-[#707271] rounded-[10px] text-[#707271] font-medium'>
                Need Help?
              </button>
            </div>
           
          </div>
      </div>
      {type==='login' ? (
        <div className='flex-grow mx-auto w-3/4'>
          <div className='mx-auto sticky top-0 bg-white z-20'>
            <p className='text-[40px] text-[#707271]'>Welcome to <span className='text-[#1EBDB8] font-bold'>Simple</span></p>
            <div> {signupError && <p className="text-red-600 my-2 flex"><span className="material-symbols-outlined mr-2"> error </span>{signupError}</p>} </div>
            
          </div>
          <div className="lg:max-w-lg mx-auto p-6 text-[#707271] text-left mt-3">
            <h2 className="text-xl font-400 mb-3 text-3xl">To login, enter you email address</h2>
            
           
            <form onSubmit={handleSubmit} className='my-8'>
              
           
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
             
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#1EBDB8] my-6 border border-[#1EBDB8] text-white rounded-[20px] font-bold hover:text-[#1EBDB8] hover:bg-transparent transition"
                onClick={handleLogin}
              >
                {loading ? <Spinner/> : 'Continue'}
              </button>
              <p className='text-center my-2'>Don't have an account? <a href='/auth/provider/signup' className=' cursor-pointer text-[#1EBDB8] hover:font-semibold duration-300'>Sign Up</a></p>
            </form>

           
          </div>
        </div> 
      ): (
        <>
          <div className='mx-auto sticky top-0 bg-white z-20'>
            <p className='text-[40px] text-[#707271]'>Welcome to <span className='text-[#1EBDB8] font-bold'>Simple</span></p>
            <div> {signupError && <p className="text-red-600 my-2 flex"><span className="material-symbols-outlined mr-2"> error </span>{signupError}</p>} </div>
            
          </div>
          <div className="lg:max-w-lg mx-auto p-6 text-[#707271] text-left mt-3">
            <h2 className="text-xl font-400 mb-3 text-[35px]">Let's get started</h2>
            <p className="text-gray-500 text-sm mb-6">
            Simple is the best way to reach the right patients for your practice. It's easy to join and there are no upfront fees or subscription costs.
            </p>
           
            <form onSubmit={handleSubmit}>
              
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
                <label className=" font-semibold block text-sm font-medium mb-2" htmlFor="email">
                  Practice Name
                </label>
                <input
                  type="text"
                  id="practiceName"
                  name="practiceName"
                  className="w-full p-3 bg-[#F5F5F5] rounded-[10px]"
                  placeholder="Enter your pratice name"
                  value={formData.practiceName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className=" font-semibold block text-sm font-medium " htmlFor="specialty">
                  Practice or Provider's Specialty
                </label>
                <label className="text-sm text-[#707271] mb-4" htmlFor="specialty">
                  Select up to 3
                </label>
                <ProviderPracticesDropdown practices={practices} selectedItems={selectedItems} setSelectedItems={setSelectedItems}/>
              </div>
              <div className="mb-4">
                <label className=" font-semibold block text-sm font-medium " htmlFor="specialty">
                  Practice size
                </label>
                <label className="text-sm text-[#707271] mb-4" htmlFor="specialty">
                  Include all providers at your practice (MDs, NPs, PAs, etc.)
                </label>
                
                  <select
                    id="practiceSize"
                    name='practiceSize'
                    value={formData.practiceSize}
                    onChange={handleChange}
                    required
                    className='custom-select w-full p-3 bg-[#F5F5F5] rounded-[10px]'
                  >
                    
                    {[...Array(15)].map((_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}

                    
                    <option value="moreThan15">More than 15</option>
                  </select>
              </div>
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
              <div className="mb-4">
                <label className="font-semibold block text-sm font-medium mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  type="text" // Using 'text' to handle formatting for phone number
                  id="phone"
                  name="phone"
                  className="w-full p-3 bg-[#F5F5F5] rounded-[10px]"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  required
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div className="mb-4">
                <label className="font-semibold block text-sm font-medium mb-2" htmlFor="zipCode">
                  Zip Code
                </label>
                <input
                  type="text" // Change to 'text' to handle the hyphen in ZIP+4 format
                  id="zipCode"
                  name="zipCode"
                  className="w-full p-3 bg-[#F5F5F5] rounded-[10px]"
                  placeholder="Enter your zip code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
                {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
              </div>
              
              <div className="mb-8">
                <label className=" font-semibold block text-sm font-medium " htmlFor="specialty">
                  How did you hear about us?
                </label>
              
                
                  <select
                    id="reference"
                    name='reference'
                    value={formData.reference}
                    onChange={handleChange}
                    className='custom-select w-full p-3 bg-[#F5F5F5] rounded-[10px]'
                    required
                  >
                      <option value="">Select an option</option>
                      <option value="friend">A friend or family member</option>
                      <option value="socialMedia">Social media (Facebook, Instagram, etc.)</option>
                      <option value="searchEngine">Search engine (Google, Bing, etc.)</option>
                      <option value="advertisement">Advertisement (TV, Radio, etc.)</option>
                      <option value="email">Email marketing</option>
                      <option value="wordOfMouth">Word of mouth</option>
                      <option value="blog">Blog or article</option>
                      <option value="onlineReview">Online review site (Yelp, Trustpilot, etc.)</option>
                      <option value="event">Event or conference</option>
                      <option value="partnership">Partnership or collaboration</option>
                      <option value="other">Other</option>
                   

                  
                  </select>
              </div>
              <div className='flex max-w-lg text-justify mb-4'>
                  <input type="checkbox" name="terms" id="terms" required className='-mt-4 w-4'/>
                  <p className='ml-2 text-sm'>By checking this box I agree to receive text messages from Simple about offers*</p>
            </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#1EBDB8] border border-[#1EBDB8] text-white rounded-[20px] font-bold hover:text-[#1EBDB8] hover:bg-transparent transition"
              >
                {loading ? <Spinner/> : 'Sign up'}
              </button>
              <p className='text-center my-2'>Already have an account? <a href='/auth/provider/login' className=' cursor-pointer text-[#1EBDB8] hover:font-semibold duration-300'>Login</a></p>
            </form>

          
          </div>
        </>
      )}
   
  
       <footer className='bg-[#1E232F] w-full relative text-white flex items-center flex-col py-5 '>
                    <div className='flex flex-col lg:flex-row justify-between w-[90%]'>
                        <div className='w-[160px]'>
                            <img src="/logo-icon.png" alt="logo" className='w-10 h-10' />
                        </div>
                        <p className='text-sm font-thin mt-3'>©  2024 Simple USA. All Rights Reserved.</p>
                        <div className='flex mr-6 h-10'>
                            <img src="/sfb.png" alt="social" className='mx-2'/>
                            <img src="/sig.png" alt="social" className='mx-2'/>
                            <img src="/sin.png" alt="social" className='mx-2'/>
                            <img src="/syt.png" alt="social" className='mx-2'/>
                           
                        </div>
                    </div>
                   
                  
                </footer>
    </div>
  );
};

export default ProviderAuthPage;
