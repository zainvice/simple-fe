import React, { useEffect, useState } from "react";

const SpecialtyDropdown = ({setSearchTerm, searchTerm}) => {
  const specialties = [
    "Primary Care Physician (PCP)",
    "OB-GYN (Obstetrician-Gynecologist)",
    "Dermatologist",
    "Dentist",
    "Ear, Nose & Throat Doctor (ENT / Otolaryngologist)",
    "Eye Doctor",
    "Psychiatrist",
    "Orthopedic Surgeon (Orthopedist)",
    "Acupuncturist",
    "Allergist (Immunologist)",
    "Audiologist",
    "Cardiologist (Heart Doctor)",
    "Cardiothoracic Surgeon",
    "Chiropractor",
    "Colorectal Surgeon",
    "Dietitian / Nutritionist",
    "Endocrinologist (incl Diabetes Specialists)",
    "Gastroenterologist",
    "Geriatrician",
    "Hearing Specialist",
    "Hematologist (Blood Specialist)",
    "Infectious Disease Specialist",
    "Infertility Specialist",
    "Midwife",
    "Naturopathic Doctor",
    "Nephrologist (Kidney Specialist)",
    "Neurologist (incl Headache Specialists)",
    "Neurosurgeon",
    "Oncologist",
    "Ophthalmologist",
    "Optometrist",
    "Oral Surgeon",
    "Orthodontist",
    "Pain Management Specialist",
    "Pediatric Dentist",
    "Pediatrician",
    "Physiatrist (Physical Medicine)",
    "Physical Therapist",
    "Plastic Surgeon",
    "Podiatrist (Foot and Ankle Specialist)",
    "Prosthodontist",
    "Psychologist",
    "Pulmonologist (Lung Doctor)",
    "Radiologist",
    "Rheumatologist",
    "Sleep Medicine Specialist",
    "Sports Medicine Specialist",
    "Surgeon",
    "Therapist / Counselor",
    "Urgent Care Specialist",
    "Urological Surgeon",
  ];
  const [specialtiesShow, setSpecialtieShow] = useState(specialties) 
  useEffect(()=>{

    if(searchTerm!=null){
        const shadowCopy = specialties
        setSpecialtieShow(shadowCopy.filter((specialty)=> specialty.toLowerCase().includes(searchTerm.toLowerCase())))
    }

  }, [searchTerm])


  return (
    <div className="absolute -bottom-[330%] bg-white rounded-[10px] text-[#1E232F] px-4 py-2 h-[200px] border-2 text-left overflow-y-auto">
     
      
        <div
          className="dropdown-options"
          role="listbox"
          
        >
          <p className="text-[#888888]">All Specialties (a-z)</p>
          {specialtiesShow.map((specialty, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              role="option"
              tabIndex={index}
              onClick={(e)=>  setSearchTerm(specialty)}
            >
              {specialty}
            </div>
          ))}
        </div>
     
    </div>
  );
};

export default SpecialtyDropdown;
