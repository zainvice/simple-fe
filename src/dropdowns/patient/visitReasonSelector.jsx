import React, { useEffect, useState } from "react";

const VisitReasonDropdown = ({ setReason, reason }) => {
  const visitReasons = [
    {
      label: "Popular Visit Reasons",
      options: [
        { value: "76", label: "Annual Physical" },
        { value: "109", label: "Hand Problems" },
        { value: "75", label: "Illness" },
        { value: "117", label: "Sleep Problems" },
        { value: "1060", label: "Weight Loss Consultation" },
      ],
    },
    {
      label: "All Visit Reasons",
      options: [
        { value: "4636", label: "Abdominal Cramps" },
        { value: "1063", label: "Abdominal Pain" },
        { value: "1066", label: "Abscess" },
        { value: "3795", label: "Absence of Menstruation / Amenorrhea" },
        { value: "2704", label: "Achilles Tendinitis" },
        { value: "1032", label: "Acid Reflux / Heartburn" },
        { value: "86", label: "Acne" },
        { value: "5396", label: "Acute Cough" },
        { value: "375", label: "Adrenal Problems" },
        { value: "4100", label: "Age Spots" },
        { value: "1613", label: "Allergic Arthritis" },
        { value: "502", label: "Allergic Asthma" },
        { value: "4409", label: "Allergic Bronchopulmonary Aspergillosis" },
        { value: "163", label: "Allergic Cough" },
        { value: "164", label: "Allergic Eye Problems" },
        { value: "5619", label: "Alopecia Barbae" },
        { value: "2548", label: "Anal Warts / Condyloma" },
        { value: "5621", label: "Androgenetic Alopecia" },
        { value: "384", label: "Anemia" },
        { value: "1664", label: "Animal Allergies" },
        { value: "1712", label: "Ankle Pain" },
        { value: "422", label: "Ankle Problems" },
        { value: "1673", label: "Ankylosing Spondylitis" },
        { value: "2970", label: "Annual Check Up" },
        { value: "2446", label: "Anorgasmia" },
        { value: "4519", label: "Anovulation" },
        { value: "2854", label: "Anterior Cruciate Insufficiency" },
        { value: "3863", label: "Anterior Cruciate Ligament (ACL) Injury" },
        { value: "494", label: "Anxiety" },
        { value: "5809", label: "Anxiety Disorder" },
        { value: "1717", label: "Arm Pain" },
        { value: "3203", label: "Arm Problem(s)" },
        { value: "1160", label: "Arrhythmia - Drug Therapy" },
        { value: "1724", label: "Arterial Doppler" },
        { value: "210", label: "Asthma" },
        { value: "490", label: "Athlete's Foot" },
        { value: "179", label: "Attention-Deficit / Hyperactivity Disorder (ADHD)" },
        { value: "1812", label: "Back Pain" },
        { value: "122", label: "Back Problems" },
        { value: "2500", label: "Bad breath/Halitosis" },
        { value: "3822", label: "Bicep Injury" },
        { value: "4618", label: "Bicep Tendonitis" },
        { value: "1433", label: "Biliary Tract Problem" },
        { value: "129", label: "Birth Control / Contraception" },
        { value: "4053", label: "Birth Control / Contraception Consultation" },
        { value: "1916", label: "Bladder Pain / Interstitial Cystitis" },
        { value: "3320", label: "Blisters" },
        { value: "5568", label: "Bloating" },
        { value: "2477", label: "Blood Work" },
        { value: "2447", label: "Blood in Urine / Hematuria" },
        { value: "4366", label: "Body Ache / Pain" },
        { value: "4344", label: "Bradycardia" },
        { value: "2558", label: "Breast Pain" },
        { value: "4026", label: "Breast Problems" },
        { value: "390", label: "Bronchitis" },
        { value: "4227", label: "Brown / Dark Spots" },
        { value: "1175", label: "Bruise / Contusion" },
        { value: "188", label: "Bunion" },
        { value: "3289", label: "Burning Sensation in Urine" },
        { value: "4621", label: "Bursitis" },
        { value: "4020", label: "Buttock Pain" },
        { value: "6187", label: "COVID-19 Treatment" },
        { value: "1090", label: "Carpal Tunnel Syndrome" },
        { value: "3220", label: "Celiac Disease" },
        { value: "3840", label: "Cervical Sprain / Strain" },
        { value: "4531", label: "Cervicitis" },
        { value: "4439", label: "Cholesterol Management" },
        { value: "3290", label: "Chronic Cough" },
        { value: "4622", label: "Chronic Fatigue Syndrome" },
        { value: "2520", label: "Chronic Illness" },
        { value: "3138", label: "Chronic Migraine" },
        { value: "389", label: "Chronic Obstructive Pulmonary Disease (COPD)" },
        { value: "3211", label: "Cold Sores / Herpes Labialis" },
        { value: "3246", label: "Conjunctivitis" },
        { value: "1600", label: "Constipation" },
        { value: "4413", label: "Continuous Positive Airway Pressure (CPAP)" },
        { value: "4378", label: "Contraception" },
        { value: "1606", label: "Coronary Artery Disease" },
        { value: "3194", label: "Cough" },
        { value: "1069", label: "Crohn's Disease" },
        { value: "3103", label: "Cubital Tunnel Syndrome" },
        { value: "1617", label: "Cystocele" },
        { value: "5730", label: "Dandruff" },
        { value: "222", label: "Daytime Sleepiness" },
        { value: "3826", label: "De Quervain Syndrome" },
        { value: "4256", label: "Degenerative Disc Disease" },
        { value: "1623", label: "Degenerative Disease" },
        { value: "5371", label: "Delayed Ejaculation" },
        { value: "493", label: "Depression" },
        { value: "3029", label: "Diabetes Blood Sugar Management" },
        { value: "370", label: "Diabetes Consultation" },
        { value: "1332", label: "Diabetes Follow Up" },
        { value: "186", label: "Diabetic Foot" },
        { value: "1117", label: "Diarrhea" },
        { value: "3298", label: "Difficulty Urinating" },
        { value: "1452", label: "Digestive Problem" },
        { value: "4281", label: "Disc Disease of Neck and Back" },
        { value: "4284", label: "Disc Displacement" },
        { value: "3422", label: "Dupuytren's Contracture" },
        { value: "4266", label: "Dysphagia" },
        { value: "3917", label: "Ear Drainage / Discharge" },
        { value: "3916", label: "Ear Fullness / Popping" },
        { value: "111", label: "Ear Infection" },
        { value: "3478", label: "Ear Inflammation" },
        { value: "463", label: "Ear Pain" },
        { value: "1652", label: "Ear, Nose, or Throat Problem" },
        { value: "166", label: "Eczema" },
        { value: "3722", label: "Edema" },
        { value: "3359", label: "Elbow Arthritis" },
        { value: "4182", label: "Elbow Bursitis" },
        { value: "3354", label: "Elbow Pain" },
        { value: "121", label: "Elbow Problems" },
        { value: "2445", label: "Elevated PSA" },
        { value: "213", label: "Emphysema" },
        { value: "4664", label: "Eosinophilic Esophagitis" },
        { value: "5372", label: "Epididymal Cyst" },
        { value: "1256", label: "Erectile Dysfunction / Impotence / Male Sexual Dysfunction" },
        { value: "3868", label: "Excessive Sweating / Hyperhidrosis" },
        { value: "100", label: "Eye Infection" },
        { value: "5933", label: "Eye Redness" },
        { value: "1466", label: "Facial Pain" },
        { value: "2644", label: "Fatty Liver Disease" },
        { value: "1019", label: "Fever" },
        { value: "1699", label: "Fibroids" },
        { value: "1701", label: "Fibromyalgia" },
        { value: "1702", label: "Fingernail Problem" },
        { value: "3318", label: "Flat Feet" },
        { value: "1705", label: "Flu" },
        { value: "5194", label: "Folliculitis" },
        { value: "168", label: "Food Allergy" },
        { value: "4784", label: "Food Intolerance" },
        { value: "5278", label: "Food Intolerance / Allergy" },
        { value: "185", label: "Foot Infection" },
        { value: "492", label: "Foot Injuries" },
        { value: "187", label: "Foot Pain" },
        { value: "106", label: "Foot Problems" },
        { value: "3967", label: "Foot and Ankle Arthritis" },
        { value: "3970", label: "Foot and Ankle Tendonitis" },
        { value: "1253", label: "Frequent Urination" },
        { value: "3232", label: "Frozen Shoulder" },
        { value: "1718", label: "Fungal Infection" },
        { value: "1432", label: "Gall Bladder Problem" },
        { value: "3827", label: "Ganglion Cyst" },
        { value: "2614", label: "Gastroesophageal Reflux Disease (GERD)" },
        { value: "1723", label: "Gastrointestinal Problem" },
        { value: "2356", label: "Gender Affirming Counseling" },
        { value: "83", label: "General Consultation" },
      ],
    },
  ];

  const [visitReasonsShow, setVisitReasonShow] = useState(visitReasons);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm !== '') {
      const filteredVisitReasons = visitReasons.map((group) => {
        const filteredOptions = group.options.filter((option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return { ...group, options: filteredOptions };
      });
      setVisitReasonShow(filteredVisitReasons);
    } else {
      setVisitReasonShow(visitReasons);
    }
  }, [searchTerm]);

  return (
    <div className="absolute -bottom-[480%] bg-white rounded-[10px] text-[#1E232F] w-[400px] px-4 py-2 h-[200px] border-2 text-left overflow-y-auto">
      <div className="dropdown-options" role="listbox">
       
        <input
          type="text"
          className="w-full px-2 py-1 mb-2 border border-gray-300 rounded"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {visitReasonsShow.map((group, index) => (
          <div key={index}>
            <p className="font-bold">{group.label}</p>
            {group.options.map((option) => (
              <div
                key={option.value}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                role="option"
                onClick={() => setReason(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitReasonDropdown;
