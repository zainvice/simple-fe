import React, {useState} from 'react';
import Button from '../../../common/patient/button';
import Verificationoverlay from '../../../overlays/patient/verificationoverlay';
import ProviderPracticesDropdown from '../../../dropdowns/provider/providerspecialtyselector';
import { useMatch } from 'react-router-dom';


const ProviderAuthPage = () => {
  const [isLoginOpen, setLoginOpen] = useState(false) 
  const practices = [
    {
      name: "Acupuncturist",
      subtypes: []
    },
    {
      name: "Allergist / Immunologist",
      subtypes: []
    },
    {
      name: "Anesthesiologist",
      subtypes: [
        "Cardiothoracic Anesthesiologist",
        "Critical Care Anesthesiologist",
        "Obstetric Anesthesiologist",
        "Pediatric Anesthesiologist",
        "Pain Management Anesthesiologist"
      ]
    },
    {
      name: "Cardiologist",
      subtypes: [
        "Interventional Cardiologist",
        "Electrophysiologist",
        "Heart Failure Specialist",
        "Preventive Cardiologist",
        "Cardiac Imaging Specialist"
      ]
    },
    {
      name: "Colon and Rectal Surgeon",
      subtypes: []
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
      name: "Emergency Medicine Specialist",
      subtypes: [
        "Pediatric Emergency Medicine",
        "Toxicology Specialist",
        "Disaster Medicine Specialist",
        "Critical Care Specialist"
      ]
    },
    {
      name: "Endocrinologist",
      subtypes: [
        "Pediatric Endocrinologist",
        "Reproductive Endocrinologist"
      ]
    },
    {
      name: "Family Medicine Physician",
      subtypes: []
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
      name: "Geneticist",
      subtypes: [
        "Medical Geneticist",
        "Clinical Molecular Geneticist",
        "Biochemical Geneticist",
        "Cytogeneticist"
      ]
    },
    {
      name: "Geriatrician",
      subtypes: []
    },
    {
      name: "Hematologist",
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
      name: "Internist",
      subtypes: []
    },
    {
      name: "Medical Oncologist",
      subtypes: []
    },
    {
      name: "Nephrologist",
      subtypes: []
    },
    {
      name: "Neurologist",
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
      name: "Nuclear Medicine Specialist",
      subtypes: []
    },
    {
      name: "Obstetrician / Gynecologist",
      subtypes: [
        "Maternal-Fetal Medicine Specialist",
        "Reproductive Endocrinologist",
        "Gynecologic Oncologist",
        "Urogynecologist"
      ]
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
      name: "Orthopaedic Surgeon",
      subtypes: [
        "Sports Medicine Orthopedist",
        "Spine Surgeon",
        "Joint Replacement Surgeon",
        "Pediatric Orthopedist",
        "Hand Surgeon"
      ]
    },
    {
      name: "Otolaryngologist (ENT)",
      subtypes: [
        "Head and Neck Surgeon",
        "Pediatric ENT",
        "Rhinologist",
        "Otologist / Neurotologist"
      ]
    },
    {
      name: "Pathologist",
      subtypes: [
        "Anatomic Pathologist",
        "Clinical Pathologist",
        "Forensic Pathologist",
        "Hematopathologist",
        "Molecular Pathologist"
      ]
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
      name: "Physiatrist (Physical Medicine and Rehabilitation)",
      subtypes: [
        "Pain Management Specialist",
        "Sports Medicine Specialist",
        "Spinal Cord Injury Specialist",
        "Pediatric Physiatrist"
      ]
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
      name: "Podiatrist",
      subtypes: [
        "Surgical Podiatrist",
        "Sports Medicine Podiatrist",
        "Pediatric Podiatrist"
      ]
    },
    {
      name: "Preventive Medicine Specialist",
      subtypes: [
        "Aerospace Medicine Specialist",
        "Occupational Medicine Specialist",
        "Public Health Specialist"
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
      name: "Pulmonologist",
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
      name: "Urologist",
      subtypes: [
        "Pediatric Urologist",
        "Oncologic Urologist",
        "Female Pelvic Medicine Specialist"
      ]
    },
    {
      name: "Chiropractor",
      subtypes: []
    },
    {
      name: "Physical Therapist",
      subtypes: []
    },
    {
      name: "Occupational Therapist",
      subtypes: []
    },
    {
      name: "Speech-Language Pathologist",
      subtypes: []
    },
    {
      name: "Nutritionist / Dietitian",
      subtypes: []
    },
    {
      name: "Pharmacist",
      subtypes: []
    },
    {
      name: "Nurse Practitioner",
      subtypes: []
    },
    {
      name: "Physician Assistant",
      subtypes: []
    },
    {
      name: "Optometrist",
      subtypes: []
    },
    {
      name: "Audiologist",
      subtypes: []
    }
  ];
    
  const loginMatch = useMatch('/login');
  const signupMatch = useMatch('/signup');

  const [isVerificationOpen, setVerificationOpen] = useState(false) 
  const [isStepComplete, setStep] = useState(false) 
  const [isPhoneProvided, setPhoneProvided] = useState(true)

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
    <div className="flex flex-col poppins bg-[#FFFFFF] text-center">
  
      {isVerificationOpen&&<Verificationoverlay onClose={onOpenCloseVerification} email={formData.email}/>}

      <div className='w-full flex justify-between lg:p-8 p-4'>
          <a className='flex lg:ml-6' href='/'>
          <img src="/logodark-icon.png" alt="Logo" className="h-12 lg:ml-6 ml-3" />
          <p className='hidden lg:block text-[28px] ml-2 text-[#1EBDB8] font-medium'>Simple</p>
           <p className='text-[#707271] ml-2 mt-3'>for Providers</p>
          </a>
          <div className='flex text-[#888888] mr-5'>
            <div className='flex text-[#888888] mt-2 cursor-pointer'>
            
              Find Care
            </div>
            <div className='mx-2 mt-2'>
              |
            </div>
            <div>
              <Button text={'SIGN IN'} onClick={onOpenCloseLogin}/>
            </div>
            <div className='ml-6 '>
              <button className='px-3 py-2 border-2 border-[#707271] rounded-[10px] text-[#707271] font-medium'>
                Need Help?
              </button>
            </div>
           
          </div>
      </div>
      {loginMatch ? (
        <></> 
      ): (
        <>
         <p className='text-[40px] text-[#707271]'>Welcome to <span className='text-[#1EBDB8] font-bold'>Simple</span></p>
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
                  id="praticeName"
                  name="praticeName"
                  className="w-full p-3 bg-[#F5F5F5] rounded-[10px]"
                  placeholder="Enter your pratice name"
                  value={formData.praticeName}
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
                <ProviderPracticesDropdown practices={practices}/>
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
                    value={formData?.practiceSize}
                    onChange={handleChange}
                    className='w-full p-3 bg-[#F5F5F5] rounded-[10px]'
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
                <label className=" font-semibold block text-sm font-medium mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  type="phone"
                  id="phone"
                  name="phone"
                  className="w-full p-3 bg-[#F5F5F5] rounded-[10px]"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className=" font-semibold block text-sm font-medium mb-2" htmlFor="zipCode">
                  Zip Code
                </label>
                <input
                  type="number"
                  id="zipCode"
                  name="zipCode"
                  className="w-full p-3 bg-[#F5F5F5] rounded-[10px]"
                  placeholder="Enter your zip code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-8">
                <label className=" font-semibold block text-sm font-medium " htmlFor="specialty">
                  How did you hear about us?
                </label>
              
                
                  <select
                    id="practiceSize"
                    value={formData?.practiceSize}
                    onChange={handleChange}
                    className='w-full p-3 bg-[#F5F5F5] rounded-[10px]'
                  >
                    
                    {[...Array(15)].map((_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}

                    
                    <option value="moreThan15">More than 15</option>
                  </select>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#1EBDB8] border border-[#1EBDB8] text-white rounded-[20px] font-bold hover:text-[#1EBDB8] hover:bg-transparent transition"
              >
                Sign up
              </button>
              <p className='text-center my-2'>Already have an account? <span>Login</span></p>
            </form>

            <div className='flex max-w-lg text-justify mb-4'>
                  <input type="checkbox" name="terms" id="terms" required className='-mt-4 w-4'/>
                  <p className='ml-2 text-sm'>By checking this box I agree to receive text messages from Simple about offers*</p>
            </div>
          </div>
        </>
      )}
   
  
       <footer className='bg-[#1E232F] w-full relative text-white flex items-center flex-col py-5'>
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
