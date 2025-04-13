import { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "react-hot-toast";
import { UploadCloud } from "lucide-react";
import { getUserByEmail, updateUserByEmail } from '../../api/userCalls';
import { useSelector } from 'react-redux';

export default function Verification() {
  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    phone: "",
    email: "",
    residentialAddress: "",
    practiceAddress: "",
    npi: "",
    license: "",
    specialty: "",
    dea: "",
    education: "",
    employer: "",
    hospitalAffiliations: "",
    insuranceProvider: "",
    govID: null,
    medicalLicenseCopy: null,
    malpracticeInsurance: null,
    backgroundCheckConsent: false,
  });

  const { user } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(()=> {
    const fetchUser = async( user ) => {
        
        try {
            
            const response = await getUserByEmail(user.email)
            setProfile(response)
            console.log(response)
            
        } catch (error) {
            console.error("Error", error)
            
        }
    }
    if(user){
       fetchUser(user)
    }

  }, [user])

  useEffect(() => {
    if (profile) {
      setForm((prev) => ({
        ...prev,
        fullName: profile.firstName ? "Dr. " + profile.firstName + " " + profile.lastName : '',
        dob: profile.dob || '',
        phone: profile.phoneNumber || '',
        email: profile.email || '',
        residentialAddress: profile.address || '',
        practiceAddress: profile.location || '',
        employer: profile.practiceName || '',

      }));
    }
  }, [profile]);
  

  const handleInputChange = (e, key) => {
    const value = e.target.value;
    setForm(prev => ({ ...prev, [key]: value }));

    let error = "";

    if (key === "phone" && !/^\d{0,10}$/.test(value)) {
      error = "Phone must be up to 10 digits.";
    } else if (key === "email" && value && !value.includes("@")) {
      error = "Invalid email address.";
    } else if (key === "npi" && value && !/^\d{0,10}$/.test(value)) {
      error = "NPI must be 10 digits.";
    }

    setErrors(prev => ({ ...prev, [key]: error }));
  };

  const handleFileChange = (e, key) => {
    setForm(prev => ({ ...prev, [key]: e.target.files[0] }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.fullName) newErrors.fullName = "Full name is required.";
    if (!form.dob) newErrors.dob = "Date of birth is required.";
    if (!form.phone.match(/^\d{10}$/)) newErrors.phone = "Phone number must be 10 digits.";
    if (!form.email.includes("@")) newErrors.email = "Invalid email address.";
    if (!form.npi.match(/^\d{10}$/)) newErrors.npi = "NPI must be 10 digits.";
    if (!form.license) newErrors.license = "Medical license number is required.";
    if (!form.specialty) newErrors.specialty = "Specialty is required.";
    if (!form.education) newErrors.education = "Education and residency details are required.";
    if (!form.employer) newErrors.employer = "Employer name is required.";
    if (!form.govID) newErrors.govID = "Government-issued ID is required.";
    if (!form.medicalLicenseCopy) newErrors.medicalLicenseCopy = "Medical license copy is required.";
    if (!form.malpracticeInsurance) newErrors.malpracticeInsurance = "Malpractice insurance certificate is required.";
    if (!form.backgroundCheckConsent) newErrors.backgroundCheckConsent = "Background check consent is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderField = (key, label, type, placeholder = "") => (
    <div key={key}>
      <Label htmlFor={key} className="block mb-1 font-medium text-sm text-gray-700">
        {label}
      </Label>
      <Input
        id={key}
        name={key}
        type={type}
        placeholder={placeholder}
        className="w-full border rounded-md p-2 placeholder:text-gray-400"
        value={form[key]}
        onChange={(e) => handleInputChange(e, key)}
      />
      {errors[key] && <p className="text-red-500 text-sm mt-1">{errors[key]}</p>}
    </div>
  );

  const renderFileUpload = (key, label) => (
    <div key={key} className="w-full">
      <Label htmlFor={key} className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </Label>
      <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-center text-center hover:border-[#1EBDB8] transition-colors cursor-pointer bg-gray-50">
        <input
          id={key}
          name={key}
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => handleFileChange(e, key)}
        />
        <div className="flex flex-col items-center gap-2 text-sm text-gray-600">
          <UploadCloud className="w-6 h-6 text-[#1EBDB8]" />
          <p className="font-medium">Click or drag file to upload</p>
          <p className="text-xs text-gray-400">Accepted formats: PDF, JPG, PNG</p>
        </div>
      </div>
      {form[key] && (
        <p className="text-sm mt-2 text-gray-700">
          📎 <span className="font-medium">{form[key]?.name}</span>
        </p>
      )}
      {errors[key] && <p className="text-red-500 text-sm mt-1">{errors[key]}</p>}
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      toast.success("Provider details submitted successfully!");
    } else {
      toast.error("Please fix the errors in the form.");
    }
  };

  return (
    <div className="p-6 bg-white items-center justify-center flex shadow-md rounded-[10px] mt-8 mx-8 overflow-y-auto max-h-[84%]">
      <Card className="w-full max-w-3xl h-full overflow-y-auto shadow-lg p-6 bg-white rounded-2xl">
        <div className="flex items-center justify-center mb-2">
          <img src="/logodark-icon.png" alt="Logo" className="h-12 " />
          <p className='hidden lg:block text-[28px] ml-2 text-[#1EBDB8] font-medium'>Simple</p>
        </div>
        <h2 className="text-2xl font-bold text-[#1EBDB8] text-center mb-4 flex justify-center items-center">Provider Verification <span className="material-symbols-outlined text-[28px]"> verified_user </span></h2>
        <div className='flex text-[#888888] mb-2 items-center justify-center'>
            <div className='flex text-[#888888] '>
              <span className="material-symbols-outlined "> lock </span>
              All information is end-to-end encrypted.
            </div>
            
          </div>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 📍 Personal Info */}
            <h3 className="text-lg font-semibold mb-2 text-[#1EBDB8]">Personal Information</h3>
            {renderField("fullName", "Full Legal Name", "text", "e.g., Dr. Samantha Carter")}
            {renderField("dob", "Date of Birth", "date")}
            {renderField("phone", "Phone Number", "tel", "e.g., 5551234567")}
            {renderField("email", "Email", "email", "e.g., doctor@example.com")}
            {renderField("residentialAddress", "Residential Address", "text")}
            {renderField("practiceAddress", "Practice Address", "text")}

            {/* 🩻 Credentials */}
            <h3 className="text-lg font-semibold mt-6 mb-2 text-[#1EBDB8]">Professional Credentials</h3>
            {renderField("npi", "NPI Number", "text", "10-digit National Provider ID")}
            {renderField("license", "Medical License Number", "text")}
            {renderField("specialty", "Specialty & Certifications", "text")}
            {renderField("dea", "DEA Registration (Optional)", "text")}
            {renderField("education", "Education & Residency Details", "text")}
            {renderField("employer", "Current Employer / Practice Name", "text")}
            {renderField("hospitalAffiliations", "Hospital Affiliations", "text")}
            {renderField("insuranceProvider", "Insurance Provider Participation", "text")}

            {/* 📄 Uploads */}
            <h3 className="text-lg font-semibold mt-6 mb-2 text-[#1EBDB8]">Document Uploads</h3>
            {renderFileUpload("govID", "Government-issued ID")}
            {renderFileUpload("medicalLicenseCopy", "Medical License Copy")}
            {renderFileUpload("malpracticeInsurance", "Malpractice Insurance Certificate")}

           {/* ✅ Consent */}
              <div className="space-y-2">
                <Label className="flex items-start space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.backgroundCheckConsent}
                    onChange={(e) => setForm({ ...form, backgroundCheckConsent: e.target.checked })}
                    className="mt-1"
                  />
                  <span>
                    I consent to a background check for provider verification.
                  </span>
                </Label>
                {errors.backgroundCheckConsent && (
                  <p className="text-red-500 text-sm mt-1">{errors.backgroundCheckConsent}</p>
                )}

                <p className="text-xs text-gray-500 mt-1 italic">
                  🔒 All information submitted will be securely processed and verified with government and relevant regulatory agencies. Simple reserves the right to reject any application without providing a reason.
                </p>
              </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full p-2">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
