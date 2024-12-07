import React, {useState} from 'react';

const Loginoverlay = ({onClose}) => {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
      };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex text-left items-center justify-center" onClick={onClose}>
             <div className="bg-[#FFFFFF] text-[#1E232F] rounded-[10px] shadow-lg p-8 lg:w-[600px] md:w-[500px] w-[350px]">
                <h2 className="text-[24px] font-medium mb-4">To log in, enter your email address</h2>
                <div className="mb-4 text-[#707271]">
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
                    className="w-full py-2 px-4 bg-[#1EBDB8] border border-[#1EBDB8] text-white rounded-[20px] font-bold hover:text-[#1EBDB8] hover:bg-transparent transition"
                    >
                    Continue
                </button>
                <div className="my-2 text-center text-gray-400">Or</div>
                <div className="flex flex-col gap-2 mb-4">
                    <button className="flex-1 py-2 px-4 border border-[[#1E232F] rounded-[10px] flex items-center justify-center hover:bg-gray-100 transition">
                    <img src="google-logo.png" alt="Google" className="w-5 h-5 mr-2" />
                    Continue with Google
                    </button>
                    <button className="flex-1 py-2 px-4 border border-[[#1E232F] rounded-[10px] flex items-center justify-center hover:bg-gray-100 transition">
                    <img src="apple-logo.png" alt="Apple" className="w-5 h-5 mr-2" />
                    Continue with Apple
                    </button>
                </div>
                </div>
        </div>
    );
}

export default Loginoverlay;