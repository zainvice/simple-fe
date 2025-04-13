import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserByEmail, updateUserByEmail } from '../../api/userCalls';
import ClipLoader from "react-spinners/ClipLoader";

import zipcodes from 'us-zips'; // Validates US ZIP codes
import moment from 'moment-timezone'; // Fetches time zones
import ProviderPracticesDropdown from '../../dropdowns/provider/providerspecialtyselector';
import { uploadFile } from '../../api/api';

const genders = ['Male', 'Female', 'Non-Binary', 'Prefer not to say'];
const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];
const usStates = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
  { code: "DC", name: "District of Columbia" }, 
  { code: "PR", name: "Puerto Rico" },
  { code: "GU", name: "Guam" },
  { code: "AS", name: "American Samoa" },
  { code: "MP", name: "Northern Mariana Islands" },
  { code: "VI", name: "U.S. Virgin Islands" }
];
const usStatesTimezones = {
  "AL": "America/Chicago", "AK": "America/Anchorage", "AZ": "America/Phoenix", "AR": "America/Chicago", "CA": "America/Los_Angeles",
  "CO": "America/Denver", "CT": "America/New_York", "DE": "America/New_York", "FL": "America/New_York", "GA": "America/New_York",
  "HI": "Pacific/Honolulu", "ID": "America/Boise", "IL": "America/Chicago", "IN": "America/Indiana/Indianapolis", "IA": "America/Chicago",
  "KS": "America/Chicago", "KY": "America/New_York", "LA": "America/Chicago", "ME": "America/New_York", "MD": "America/New_York",
  "MA": "America/New_York", "MI": "America/Detroit", "MN": "America/Chicago", "MS": "America/Chicago", "MO": "America/Chicago",
  "MT": "America/Denver", "NE": "America/Chicago", "NV": "America/Los_Angeles", "NH": "America/New_York", "NJ": "America/New_York",
  "NM": "America/Denver", "NY": "America/New_York", "NC": "America/New_York", "ND": "America/Chicago", "OH": "America/New_York",
  "OK": "America/Chicago", "OR": "America/Los_Angeles", "PA": "America/New_York", "RI": "America/New_York", "SC": "America/New_York",
  "SD": "America/Chicago", "TN": "America/Chicago", "TX": "America/Chicago", "UT": "America/Denver", "VT": "America/New_York",
  "VA": "America/New_York", "WA": "America/Los_Angeles", "WV": "America/New_York", "WI": "America/Chicago", "WY": "America/Denver"
};
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


const ProfilePageProv = () => {

  const { user } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState({});
  const [isDataLoading, setDataLoading] = useState(true)
  const [timezones, setTimezones] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);



  useEffect(()=> {
    const fetchUser = async( user ) => {
        setDataLoading(true)
        try {
            
            const response = await getUserByEmail(user.email)
            setProfile(response)
            console.log(response)
            setSelectedItems(profile?.specialty|| [])
            setDataLoading(false)
        } catch (error) {
            console.error("Error", error)
            setDataLoading(false)
        }
    }
    if(user){
       fetchUser(user)
    }
    setTimezones(moment.tz.names());
  }, [user])

  console.log("data loading", isDataLoading)
  const validateZip = (e) => {
    const zip = e.target.value;
    if (!zipcodes[zip]) {
      alert('Invalid ZIP Code!');
    } else {
      setProfile((prev) => ({ ...prev, zipCode: zip }));
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedProfile = { ...profile, [name]: value };
    
    if (name === "state" && usStatesTimezones[value]) {
      updatedProfile = { ...updatedProfile, timezone: usStatesTimezones[value] };
    }
    
    setProfile(updatedProfile);
  };
  const [isAvatarUploading, setIsAvatarUploading] = useState(false); // new state

  const handleAvatarChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Local preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile((prev) => ({ ...prev, avatar: event.target.result }));
      };
      reader.readAsDataURL(file);
  
      // Upload
      try {
        setIsAvatarUploading(true); // start upload
  
        const uploadedFile = await uploadFile(file, user.email);
        const imageUrl = uploadedFile.url;
  
        setProfile((prev) => ({ ...prev, avatar: imageUrl }));
      } catch (error) {
        console.error("Avatar upload failed:", error);
      } finally {
        setIsAvatarUploading(false); // finish upload
      }
    }
  };

  const onSave = async () => {

    if (isAvatarUploading) {
      alert("Please wait, avatar is still uploading... ⏳");
      return;
    }
    setIsSaving(true);
    setSaveError(null); // reset error each time
    let finalProfile = { ...profile };
    try {
      if (finalProfile.avatar && typeof finalProfile.avatar !== 'string') {
        const uploadedFile = await uploadFile(finalProfile.avatar, user.email);
        finalProfile.avatar = uploadedFile.url;
      } else if (finalProfile.avatar?.startsWith('data:image')) {
        // 🧪 Fallback check if it's still base64
        const blob = await (await fetch(finalProfile.avatar)).blob();
        const file = new File([blob], "avatar.png", { type: blob.type });
        const uploadedFile = await uploadFile(file, user.email);
        finalProfile.avatar = uploadedFile.url;
      }
  
      await updateUserByEmail(user.email, finalProfile);

      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 2000); // hide after 3s
    } catch (error) {
      console.error(error);
      setSaveError("⚠️ Server error. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  

  return (
    <div className="p-6 bg-white shadow-md rounded-[10px] mt-8 mx-8 overflow-y-auto max-h-[84%] h-[84%]">
      {showSuccessPopup && (
        <div className="fixed top-20 right-10 bg-[#1EBDB8] text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-slideIn">
          All changes saved successfully!
        </div>
      )}
    <div className="h-24 w-full bg-gradient-to-r from-[#1EBDB8] to-[#FAF6E0] rounded-t-lg"></div>
     {!isDataLoading ? (
        <>
                 {/* Banner */}
           

          {/* Profile Details */}
          <div className="flex items-center mb-4 mt-2">
            {/* Avatar with Hover Upload */}
            <div className="relative w-36 h-36">
              <img
                src={profile.avatar}
                alt="Avatar"
                className="w-36 h-36 rounded-full border-4 border-white object-cover"
              />
              {/* Hover Effect */}
              <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-white text-sm"><span class="material-symbols-outlined"> photo_camera </span></span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
            </div>

            <div className="ml-4">
              <h2 className="text-2xl font-semibold flex">{profile.firstName} {profile.lastName} {profile.verified ? <p className='text-sm flex text-[#1E232F] font-normal ml-4'> <span className="material-symbols-outlined my-auto mr-2"> user_verified </span>Profile Verified</p> : <p className='text-sm flex text-[#1E232F] font-normal ml-4'> <span className="material-symbols-outlined my-auto text-[#EC5252] mr-2"> block </span><span className='my-auto text-xs'>Profile Not Verified</span></p>}</h2>
              <p className="text-gray-500">{profile.practiceName}</p> 
            </div>
            <div className='ml-auto flex space-x-4'>
            <button
              onClick={() => window.location.href = 'verification'}
              className=" mr-2 px-4 flex py-4 bg-[#1EBDB8] text-white rounded-full"
              title='Start Verification'
            >
            Start Verification
            </button>
            <div className="relative">
              <button 
                onClick={onSave}
                className="mr-2 px-4 flex py-4 bg-[#1EBDB8] text-white rounded-full items-center"
                title="Save"
                disabled={isAvatarUploading || isSaving}
              >
                {isSaving ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                ) : (
                  <span className="material-symbols-outlined my-auto">save</span>
                )}
              </button>

              {saveError && (
                <p className="text-red-500 text-sm mt-2 absolute left-0">{saveError}</p>
              )}
            </div>


            </div>
            
          </div>
            <div className='border p-2 rounded-xl shadow-lg'>
              <h2 className='font-bold text-xl text-center mb-4 text-[#1EBDB8]'>About You</h2>
              <div className="p-2 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#F5F5F5] mt-2 rounded-[10px] custom-select"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#F5F5F5] mt-2 rounded-[10px] custom-select"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#F5F5F5] mt-2 rounded-[10px] custom-select"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={profile.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#F5F5F5] mt-2 rounded-[10px] custom-select"
                    disabled
                  />
                </div>
              
                <div>
                <label className="block text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={profile.gender || ''}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#F5F5F5] mt-2 rounded-[10px] custom-select"
                >
                  <option value="">Select Gender</option>
                  {genders.map((gender) => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <label className="block text-gray-700 mb-1">Languages Spoken</label>
                
                <div
                  className="w-full p-3 bg-[#F5F5F5] rounded-[10px] cursor-pointer"
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                >
                  {profile.languagesSpoken?.length > 0
                    ? profile.languagesSpoken.join(', ')
                    : "Select Languages"}
                </div>

                {showLanguageDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-[10px] max-h-48 overflow-auto shadow-lg">
                    {languages.map((lang) => (
                      <div
                        key={lang}
                        onClick={() => {
                          const alreadySelected = profile.languagesSpoken.includes(lang);
                          const updated = alreadySelected
                            ? profile.languagesSpoken.filter(l => l !== lang)
                            : [...profile.languagesSpoken, lang];

                          handleInputChange({
                            target: { name: "languagesSpoken", value: updated }
                          });
                        }}
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                          profile.languagesSpoken.includes(lang) ? "bg-[#1EBDB8] text-white" : ""
                        }`}
                      >
                        {lang}
                      </div>
                    ))}
                  </div>
                )}
              </div>


              <div>
                <label className="block text-gray-700">About / Highlight</label>
                <textarea
                  className="w-full p-3 bg-[#F5F5F5] mt-2 rounded-[10px] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#1EBDB8] resize-none"
                  placeholder="Write something amazing about yourself or your highlight  (100–250 characters)"
                  minLength={100}
                  maxLength={250}
                  value={profile.about}
                  rows={4}
                  required
                  name="about"
                  onChange={handleInputChange}
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">Must be between 100 and 250 characters.</p>
              </div>



              </div>
            </div>
            <div className='border p-2 rounded-xl shadow-lg mt-4'>
            <h2 className='font-bold text-xl text-center mb-4 text-[#1EBDB8]'>About Your Practice</h2>
              <div className="p-2 grid grid-cols-2 gap-4 pb-6" >
                <div>
                  <label className="block text-gray-700">Practice Name</label>
                  <input
                    type="text"
                    name="practiceName"
                    value={profile.practiceName}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#F5F5F5] mt-2 rounded-[10px] custom-select"
                  />
                </div>
                <div className="">
                    <label className="block text-gray-700" htmlFor="specialty">
                      Practice or Provider's Specialty
                    </label>
                  
                    <ProviderPracticesDropdown practices={practices} selectedItems={selectedItems} setSelectedItems={setSelectedItems}/>
                    <label className="text-sm text-[#707271]" htmlFor="specialty">
                      Select up to 3
                    </label>
                  </div>
                <div>
                <label className="block text-gray-700">Practice Size</label>
                <input
                    type="text"
                    name="practiceSize"
                    value={profile.practiceSize}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#F5F5F5] mt-2 rounded-[10px] custom-select"
                  />
              </div>
            

              <div>
                <label className="block text-gray-700">Full Practice Address</label>
                <input
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#F5F5F5] mt-2 rounded-[10px] custom-select"
                  />
                  <label className="text-sm text-[#707271]" htmlFor="specialty">
                      e.g ABC Health Partners - 6746 Charlotte Pike, San Antonio, California 
                    </label>
              </div>
              <div>
                <label className="block text-gray-700">US State</label>
                <select
                  name="state"
                  value={profile.state || ''}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#F5F5F5] mt-2 rounded-[10px] custom-select"
                >
                  <option value="">Select State</option>
                  {Object.keys(usStatesTimezones).map((stateCode) => (
                    <option key={stateCode} value={stateCode}>{stateCode}</option>
                  ))}

                </select>
              </div>
              <div>
                <label className="block text-gray-700">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={profile.zipCode || ''}
                  onBlur={validateZip}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#F5F5F5] mt-2 rounded-[10px] custom-select"
                  maxLength={5}
                />
              </div>
            
              <div>
                <label className="block text-gray-700">Time Zone</label>
                <select
                  name="timeZone"
                  value={profile.timeZone || ''}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#F5F5F5] mt-2 rounded-[10px] custom-select"
                >
                  <option value="">Select Time Zone</option>
                  {timezones.map((tz) => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 font-semibold mb-2">Do you offer Video Visits?</label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-gray-600">
                    <input
                      type="radio"
                      name="videoVisits"
                      value="true"
                      checked={profile.videoVisits === true}
                      onChange={(e) => handleInputChange({ target: { name: 'videoVisits', value: true } })}
                    />
                    Yes
                  </label>

                  <label className="flex items-center gap-2 text-gray-600">
                    <input
                      type="radio"
                      name="videoVisits"
                      value="false"
                      checked={profile.videoVisits === false}
                      onChange={(e) => handleInputChange({ target: { name: 'videoVisits', value: false } })}
                    />
                    No
                  </label>
                </div>
              </div>

              </div>
            </div>
            <div className='border p-2 rounded-xl shadow-lg mt-4'>
            <h2 className='font-bold text-xl text-center mb-4 text-[#1EBDB8]'>Your Reviews</h2>
            {profile?.reviews?.length > 0 ? (
                  <div className="p-2 grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6">
                    {profile.reviews.map((review, index) => (
                      <div key={index} className="bg-white shadow-md rounded-2xl p-4 relative">
                        <div className="flex items-center mb-3">
                          <img
                            src={review.avatar}
                            alt="Patient"
                            className="w-10 h-10 rounded-full mr-3 border border-gray-300"
                          />
                          <span className="text-gray-700 text-sm font-semibold">{review.name}</span>
                        </div>

                        {/* Rating Stars */}
                        <div className="flex items-center mb-2 absolute top-4 right-6">
                          {Array.from({ length: 5 }, (_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              fill={i < review.rating ? '#FBBF24' : 'none'}
                              viewBox="0 0 24 24"
                              stroke="#FBBF24"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.02 6.21a1 1 0 00.95.69h6.462c.969 0 1.371 1.24.588 1.81l-5.233 3.8a1 1 0 00-.364 1.118l2.02 6.21c.3.921-.755 1.688-1.54 1.118l-5.233-3.8a1 1 0 00-1.176 0l-5.233 3.8c-.784.57-1.838-.197-1.539-1.118l2.02-6.21a1 1 0 00-.364-1.118l-5.233-3.8c-.784-.57-.38-1.81.588-1.81h6.462a1 1 0 00.95-.69l2.02-6.21z"
                              />
                            </svg>
                          ))}
                        </div>

                        {/* Comment */}
                        <p className="text-gray-600 text-sm italic">"{review.comment}"</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center font-bold my-6 text-xl text-gray-600">
                    No reviews found 🫠
                  </p>
                )}

             
            </div>
        </>
     ) : (
        <div className='flex w-full h-full justify-center items-center'>
           <ClipLoader
            color={'#1EBDB8'}
            
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
     )}
    
    </div>
  );
};

export default ProfilePageProv;
