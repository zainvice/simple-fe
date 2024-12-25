import React, { useState, useEffect } from 'react';
import Header from '../common/patient/header';
import ChatPage from './patient/chats';
import ProfilePage from './patient/profile';
import MainDash from './patient/maindash';
import Appointments from './patient/appointments';
import NewAppointmentOverlay from "../overlays/patient/newappointmentoverlay";
import ViewAppointmentOverlay from "../overlays/patient/viewappointmentoverlay";
import ExplorePage from './patient/explore';
import ProviderDetails from './patient/providerDetails';
import ReviewAndBook from './patient/reviewandbook';
import ProviderMainDash from './providers/maindash';

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

const doctors = [
    {
        name: "Dr. Adam Cooper",
        type: "Cardiologist",
        specialization: '',
        location: '1.2 mil - ABC Health Partners - 6746 Charlotte Pike, San Antonio, California ',
        avatar: "https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png",
        rating: 4.8,
        videoVisits: true,
        features: [
            'New Patient Appointments',
            'Excellent wait time',
            'Highly Recommended',
           
        ],
        active: false,
        contacts: [

        ],
        messages: [

        ],
        
        availability:[
            
            {
              "date": "2024-12-13",
              "day": "Friday",
              "availableAppointments": []
            },
            {
              "date": "2024-12-14",
              "day": "Saturday",
              "availableAppointments": [
                "9:00 am",
                "10:00 am",
                "11:00 am",
                "12:00 pm"
              ]
            },
            {
              "date": "2024-12-15",
              "day": "Sunday",
              "availableAppointments": [
                "9:00 am",
                "10:00 am",
                "11:00 am"
              ]
            },
            {
              "date": "2024-12-16",
              "day": "Monday",
              "availableAppointments": []
            },
            {
              "date": "2024-12-17",
              "day": "Tuesday",
              "availableAppointments": [
                "9:00 am",
                "10:00 am",
                "11:00 am"
              ]
            },
            {
              "date": "2024-12-18",
              "day": "Wednesday",
              "availableAppointments": [
                "9:00 am",
                "10:00 am",
                "11:00 am"
              ]
            },
            {
              "date": "2024-12-19",
              "day": "Thursday",
              "availableAppointments": []
            },
            {
              "date": "2024-12-20",
              "day": "Friday",
              "availableAppointments": []
            },
            {
              "date": "2024-12-21",
              "day": "Saturday",
              "availableAppointments": [
                "9:00 am",
                "10:00 am",
                "11:00 am",
                "12:00 pm"
              ]
            },
            {
              "date": "2024-12-22",
              "day": "Sunday",
              "availableAppointments": [
                "9:00 am",
                "10:00 am",
                "11:00 am"
              ]
            }
          
          
        ],
        gender: 'Male',
        languagesSpoken: [
            'English',
            'Spanish'
        ],
        clientele: [
            'Young Adults (18-24)',
            'Adults (25-64)',
            'Seniors (65+)',
            'Individuals'
        ],
        reviews: [
            {name: 'Mr. Jacob', review: 'Provides details on provider experience, patient satisfaction and hospital quality.', rating: 4.6},
            {name: 'Ms. Hanna', review: 'Provides details on provider experience, patient satisfaction and hospital quality.', rating: 5.0},
            {name: 'Mr. Jacob', review: 'Provides details on provider experience, patient satisfaction and hospital quality.', rating: 4.6},
            {name: 'Ms. Hanna', review: 'Provides details on provider experience, patient satisfaction and hospital quality.', rating: 5.0},
            {name: 'Mr. Jacob', review: 'Provides details on provider experience, patient satisfaction and hospital quality.', rating: 4.6},
            {name: 'Ms. Hanna', review: 'Provides details on provider experience, patient satisfaction and hospital quality.', rating: 5.0},
            {name: 'Mr. Jacob', review: 'Provides details on provider experience, patient satisfaction and hospital quality.', rating: 4.6},
            {name: 'Ms. Hanna', review: 'Provides details on provider experience, patient satisfaction and hospital quality.', rating: 5.0},
           

        ],
        clinicTimings: [
            {
                day: 'Monday',
                startTime: 900,
                endTime: 1700,
            },
        ],
        location: '1.2 mil - ABC Health Partners - 6746 Charlotte Pike, San Antonio, California ',
        highlight: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        about: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        faqs: [
            {
                question: 'What services do you offer?',
                answer: 'We offer a variety of services including consultations, follow-ups, and specialized treatments tailored to your needs.'
            },
            {
                question: 'What are your operating hours?',
                answer: 'Our operating hours are Monday to Friday, 9:00 AM to 5:00 PM. Weekend appointments are available upon request.'
            },
            {
                question: 'How can I book an appointment?',
                answer: 'You can book an appointment through our online scheduling system or by calling our office directly.'
            },
            {
                question: 'What is your cancellation policy?',
                answer: 'Cancellations must be made at least 24 hours in advance to avoid any cancellation fees.'
            },
            {
                question: 'Do you accept insurance?',
                answer: 'Yes, we accept most major insurance plans. Please contact us to verify your coverage before your visit.'
            }
        ]
    },
    {
        name: "Dr. Shelly Christian",
        type: "Therapist",
        location: '1.2 mil - ABC Health Partners - 6746 Charlotte Pike, San Antonio, California ',
        avatar: "https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png",
        rating: 4.9,
        reviews: [
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},

        ]
    },
    {
        name: "Dr. John Doe",
        type: "Dentist",
        location: '1.2 mil - ABC Health Partners - 6746 Charlotte Pike, San Antonio, California ',
        avatar: "https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png",
        rating: 4.7,
        reviews: [
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},

        ]
    },
    {
        name: "Dr. Rachel Smith",
        type: "Psychologist",
        location: '1.2 mil - ABC Health Partners - 6746 Charlotte Pike, San Antonio, California ',
        avatar: "https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png",
        rating: 4.6,
        reviews: [
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},
            {name: '', review: ''},

        ]
    },
];

const appointments = Array.from({ length: 10 }, () => {
    const doctors = [
        
          {
            name: "Dr. Adam Cooper",
            type: "Cardiologist",
            specialization: '',
            location: '1.2 mil - ABC Health Partners - 6746 Charlotte Pike, San Antonio, California ',
            avatar: "https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png",
            rating: 4.8,
            videoVisits: true,
            features: [
                'New Patient Appointments',
                'Excellent wait time',
                'Highly Recommended',
               
            ],
            active: false,
            contacts: [
    
            ],
            messages: [
    
            ],
            
            availability:[
                
                {
                  "date": "2024-12-13",
                  "day": "Friday",
                  "availableAppointments": []
                },
                {
                  "date": "2024-12-14",
                  "day": "Saturday",
                  "availableAppointments": [
                    "9:00 am",
                    "10:00 am",
                    "11:00 am",
                    "12:00 pm"
                  ]
                },
                {
                  "date": "2024-12-15",
                  "day": "Sunday",
                  "availableAppointments": [
                    "9:00 am",
                    "10:00 am",
                    "11:00 am"
                  ]
                },
                {
                  "date": "2024-12-16",
                  "day": "Monday",
                  "availableAppointments": []
                },
                {
                  "date": "2024-12-17",
                  "day": "Tuesday",
                  "availableAppointments": [
                    "9:00 am",
                    "10:00 am",
                    "11:00 am"
                  ]
                },
                {
                  "date": "2024-12-18",
                  "day": "Wednesday",
                  "availableAppointments": [
                    "9:00 am",
                    "10:00 am",
                    "11:00 am"
                  ]
                },
                {
                  "date": "2024-12-19",
                  "day": "Thursday",
                  "availableAppointments": []
                },
                {
                  "date": "2024-12-20",
                  "day": "Friday",
                  "availableAppointments": []
                },
                {
                  "date": "2024-12-21",
                  "day": "Saturday",
                  "availableAppointments": [
                    "9:00 am",
                    "10:00 am",
                    "11:00 am",
                    "12:00 pm"
                  ]
                },
                {
                  "date": "2024-12-22",
                  "day": "Sunday",
                  "availableAppointments": [
                    "9:00 am",
                    "10:00 am",
                    "11:00 am"
                  ]
                }
              
              
            ],
            gender: 'Male',
            languagesSpoken: [
                'English',
                'Spanish'
            ],
            clientele: [
                'Young Adults (18-24)',
                'Adults (25-64)',
                'Seniors (65+)',
                'Individuals'
            ],
            reviews: [
                {name: 'Mr. Jacob', review: 'Provides details on provider experience, patient satisfaction and hospital quality.', rating: 4.6},
                {name: 'Ms. Hanna', review: 'Provides details on provider experience, patient satisfaction and hospital quality.', rating: 5.0},
                {name: 'Mr. Jacob', review: 'Provides details on provider experience, patient satisfaction and hospital quality.', rating: 4.6},
                {name: 'Ms. Hanna', review: 'Provides details on provider experience, patient satisfaction and hospital quality.', rating: 5.0},
                {name: 'Mr. Jacob', review: 'Provides details on provider experience, patient satisfaction and hospital quality.', rating: 4.6},
                {name: 'Ms. Hanna', review: 'Provides details on provider experience, patient satisfaction and hospital quality.', rating: 5.0},
                {name: 'Mr. Jacob', review: 'Provides details on provider experience, patient satisfaction and hospital quality.', rating: 4.6},
                {name: 'Ms. Hanna', review: 'Provides details on provider experience, patient satisfaction and hospital quality.', rating: 5.0},
               
    
            ],
            clinicTimings: [
                {
                    day: 'Monday',
                    startTime: 900,
                    endTime: 1700,
                },
            ],
            location: '1.2 mil - ABC Health Partners - 6746 Charlotte Pike, San Antonio, California ',
            highlight: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
            about: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
            faqs: [
                {
                    question: 'What services do you offer?',
                    answer: 'We offer a variety of services including consultations, follow-ups, and specialized treatments tailored to your needs.'
                },
                {
                    question: 'What are your operating hours?',
                    answer: 'Our operating hours are Monday to Friday, 9:00 AM to 5:00 PM. Weekend appointments are available upon request.'
                },
                {
                    question: 'How can I book an appointment?',
                    answer: 'You can book an appointment through our online scheduling system or by calling our office directly.'
                },
                {
                    question: 'What is your cancellation policy?',
                    answer: 'Cancellations must be made at least 24 hours in advance to avoid any cancellation fees.'
                },
                {
                    question: 'Do you accept insurance?',
                    answer: 'Yes, we accept most major insurance plans. Please contact us to verify your coverage before your visit.'
                }
            ]
        },
        
    ];

    const statuses = ["Booked", "Payment Failed", "Pending", "Cancelled"];
    const times = [
        "9 AM - 10 AM",
        "10 AM - 11 AM",
        "11 AM - 12 PM",
        "12 PM - 1 PM",
        "1 PM - 2 PM",
        "2 PM - 3 PM",
    ];

    const dates = [
      "2024-12-24", // Tuesday, 24th December
      "2024-12-25", // Wednesday, 25th December
      "2024-12-26", // Thursday, 26th December
      "2024-12-23", // Monday, 23rd December
      "2024-12-22"  // Sunday, 22nd December
    ];

    const randomDoctor = doctors[Math.floor(Math.random() * doctors.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomTime = times[Math.floor(Math.random() * times.length)];
    const randomDate = dates[Math.floor(Math.random() * dates.length)];

    return {
        date: randomDate,
        time: randomTime,
        type: "Video Appointment",
        doctor: randomDoctor,
        status: randomStatus,
        schedulingDetails: {
            visitReason: 'Annual Physical',
            patientType: 'Returning',
        },
        patientDetails: {
            firstName: 'Zane',
            lastName: 'Ul Hassan',
            address: '',
            insuranceinfo: '',
            memberID: '',
            phone: '',
            email: '',
            avatar: 'https://w7.pngwing.com/pngs/7/618/png-transparent-man-illustration-avatar-icon-fashion-men-avatar-face-fashion-girl-heroes-thumbnail.png',

        },
        paymentStatus: ''
    };
});

const MainPage = ({userType, type, isExpanded, showHideSidebar}) => {

    const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
    const [isViewAppointmentOpen, setIsViewAppointmentOpen] = useState(false);
    const [currentView, setCurrentView] = useState()
   

    const [location, setLocation] = useState("");
    const [error, setError] = useState("");
  
    useEffect(() => {

      const fetchLocation = async () => {
        try {
          const response = await fetch("http://ip-api.com/json/");
          if (!response.ok) {
            throw new Error("Failed to fetch location.");
          }
          const data = await response.json();
          if (data.status === "success") {
          
            const locationString = `${data.city}, ${data.regionName}`;
            setLocation(locationString);
          } else {
            setError("Unable to retrieve location.");
          }
        } catch (err) {
          setError(err.message || "An error occurred.");
        }
      };
  
      fetchLocation();
    }, []);

  
    const handleNewAppointmentOpen = () => setIsNewAppointmentOpen(true);
    const handleViewAppointmentOpen = (appointment) => {
        setCurrentView(appointment)
        setIsViewAppointmentOpen(true)
    }


    const handleCloseOverlay = () => {
        setIsNewAppointmentOpen(false);
        setIsViewAppointmentOpen(false);
    };
    return (
        <div className={`${isExpanded ? 'w-[85%]': 'lg:w-[95%] w-full'} transition-all duration-300 h-screen flex flex-col relative `}>

            {userType === 'patient' ? 
                <>
                    <Header props ={type} showSideBar={showHideSidebar} />
                    {type.state === 'dashboard' && <MainDash handleNewAppointmentOpen= {handleNewAppointmentOpen} handleViewAppointmentOpen= {handleViewAppointmentOpen} appointments={appointments}/>}
                    {type.state === 'chats' && <ChatPage/>}
                    {type.state === 'profile' && <ProfilePage/>}
                    {type.state === 'explore' && <ExplorePage handleNewAppointmentOpen= {handleNewAppointmentOpen} handleViewAppointmentOpen= {handleViewAppointmentOpen} location={location} setLocation={setLocation} error={error}/>}
                    {type.state === 'appointments' && <Appointments handleNewAppointmentOpen= {handleNewAppointmentOpen} handleViewAppointmentOpen= {handleViewAppointmentOpen} appointments={appointments}/>}
                    {type.state === 'provider details' && <ProviderDetails handleNewAppointmentOpen= {handleNewAppointmentOpen} handleViewAppointmentOpen= {handleViewAppointmentOpen} doctor={doctors[0]} visitReasons={visitReasons}/>}
                    {type.state === 'review and book' && <ReviewAndBook appointment={appointments[0]} visitReasons={visitReasons}/>}
                  
                    {isNewAppointmentOpen && <NewAppointmentOverlay onClose={handleCloseOverlay} doctor={doctors[0]} visitReasons={visitReasons}/>}

                    {isViewAppointmentOpen && <ViewAppointmentOverlay onClose={handleCloseOverlay} appointment={currentView}/>}
                </> 
                : 
                <>
                  <Header props ={type} showSideBar={showHideSidebar} />
                  {type.state === 'dashboard' && <ProviderMainDash appointments={appointments}/>}
                </>
            }
        </div>
    );
}

export default MainPage;