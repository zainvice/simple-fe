import React, { useEffect, useState } from "react";

const SpecialtyDropdown = ({ setSearchTerm, searchTerm }) => {
  const practices = [
    { name: "Primary Care Physician (PCP)" },
    { name: "OB-GYN (Obstetrician-Gynecologist)" },
    { name: "Dermatologist" },
    { name: "Dentist" },
    { name: "Ear, Nose & Throat Doctor (ENT / Otolaryngologist)" },
    { name: "Eye Doctor" },
    { name: "Psychiatrist" },
    { name: "Orthopedic Surgeon (Orthopedist)" },
    { name: "Acupuncturist" },
    { name: "Allergist (Immunologist)" },
    { name: "Audiologist" },
    { name: "Cardiologist (Heart Doctor)" },
    { name: "Cardiothoracic Surgeon" },
    { name: "Chiropractor" },
    { name: "Colorectal Surgeon" },
    { name: "Dietitian / Nutritionist" },
    { name: "Endocrinologist (incl Diabetes Specialists)" },
    { name: "Gastroenterologist" },
    { name: "Geriatrician" },
    { name: "Hematologist (Blood Specialist)" },
    { name: "Hospice and Palliative Medicine Specialist" },
    { name: "Infectious Disease Specialist" },
    { name: "Infertility Specialist" },
    { name: "Midwife" },
    { name: "Naturopathic Doctor" },
    { name: "Nephrologist (Kidney Specialist)" },
    { name: "Neurologist (incl Headache Specialists)" },
    { name: "Neurosurgeon" },
    { name: "Oncologist" },
    { name: "Ophthalmologist" },
    { name: "Optometrist" },
    { name: "Oral Surgeon" },
    { name: "Orthodontist" },
    { name: "Pain Management Specialist" },
    { name: "Pediatric Dentist" },
    { name: "Pediatrician" },
    { name: "Physiatrist (Physical Medicine)" },
    { name: "Physical Therapist" },
    { name: "Plastic Surgeon" },
    { name: "Podiatrist (Foot and Ankle Specialist)" },
    { name: "Prosthodontist" },
    { name: "Psychologist" },
    { name: "Pulmonologist (Lung Doctor)" },
    { name: "Radiologist" },
    { name: "Rheumatologist" },
    { name: "Sleep Medicine Specialist" },
    { name: "Sports Medicine Specialist" },
    { name: "Surgeon" },
    { name: "Therapist / Counselor" },
    { name: "Urgent Care Specialist" },
    { name: "Urological Surgeon" }
  ];

  const [specialtiesShow, setSpecialtieShow] = useState(practices.map(p => p.name)); 

  useEffect(() => {
    if (searchTerm != null) {
      const shadowCopy = practices.map(p => p.name);  // Extract just the names
      setSpecialtieShow(
        shadowCopy.filter((specialty) =>
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm]);

  return (
    <div className="absolute -bottom-[330%] bg-white rounded-[10px] text-[#1E232F] px-4 py-2 h-[200px] border-2 text-left overflow-y-auto">
      <div className="dropdown-options" role="listbox">
        <p className="text-[#888888]">All Specialties (a-z)</p>
        {specialtiesShow.map((specialty, index) => (
          <div
            key={index}
            className="p-2 hover:bg-gray-200 cursor-pointer"
            role="option"
            tabIndex={index}
            onClick={(e) => setSearchTerm(specialty)}
          >
            {specialty}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialtyDropdown;
