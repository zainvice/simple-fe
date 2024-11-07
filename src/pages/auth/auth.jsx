import React from 'react';
import { useLocation } from 'react-router-dom';

const AuthPage = () => {
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const isSignUp = location.pathname === '/signup';

  return (
    <div className="flex flex-col md:flex-row h-screen poppins bg-[#F3F3F3]">
     
      <div className={`hidden md:flex w-1/2 justify-center  items-center p-8 bg-[url('./authbg.png')] bg-cover bg-center ${isSignUp ? 'order-last' : ''}`}>
        <div className="text-center poppins text-white w-full h-full p-8 flex flex-col items-center">
          <img src="./logodark.png" alt="Logo" className="h-20 my-8" />
          <h2 className="text-[60px] font-semibold mb-2  mt-8">{!isLogin ? 'Hi there!' : 'Welcome Back!'}</h2>
          <p className="mb-4 font-thin">{isLogin ? "Don't Have an Account with us?" : 'Already have an account?'}</p>
          <button 
            onClick={() => window.location.href = isLogin ? '/signup' : '/login'}
            className="bg-[#00D97E] text-white py-2 mt-6 px-8 rounded-[30px] text-[14px] font-semibold"
          >
            {isLogin ? 'SIGN UP' : 'SIGN IN'}
          </button>
        </div>
      </div>


      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 border-4 text-[#121619]">
        <form className="lg:w-[75%] shadow-md rounded-[40px] p-8 flex flex-col items-center bg-white">
          <h2 className="text-[30px] my-8 text-center text-[#666666]">{isLogin ? <p>SIGN IN TO <span className='text-[#00D97E] font-bold'>SIMPLE</span></p> : <p>Create an <span className='text-[#00D97E] font-bold'>Account</span></p>}</h2>
          

          {!isLogin && (
            <>
            <div className="mb-4 w-full">
              <label className="font-semibold mb-2">Full Name</label>
              <div className='w-full bg-[#EEEBEB] p-4 rounded-[12px] text-[#5A5A5A] flex'>
                <span class="material-symbols-outlined"> id_card </span>
                <input type="text" className="bg-transparent outline-none focus:ring-0 ml-2" placeholder="Enter your full name" />
              </div>
            </div>
            <div className="mb-4 w-full">
              <label className="font-semibold mb-2">Phone</label>
              <div className='w-full bg-[#EEEBEB] p-4 rounded-[12px] text-[#5A5A5A] flex'>
                <span class="material-symbols-outlined"> call </span>
                <input type="text" className="bg-transparent outline-none focus:ring-0 ml-2" placeholder="Enter your phone number" />
              </div>
            </div>
            </>
          )}
          <div className="mb-4 w-full">
            <label className="font-semibold mb-2">Email</label>
            <div className='w-full bg-[#EEEBEB] p-4 rounded-[12px] text-[#5A5A5A] flex'>
              <span class="material-symbols-outlined"> mail </span>
              <input type="email" className="bg-transparent outline-none focus:ring-0 ml-2" placeholder="Enter your email" />
            </div>
            
          </div>
          <div className="mb-4 w-full">
            <label className="font-semibold mb-2">Password</label>
            <div className='w-full bg-[#EEEBEB] p-4 rounded-[12px] text-[#5A5A5A] flex'>
              <span class="material-symbols-outlined"> lock </span>
              <input type="password" className="bg-transparent outline-none focus:ring-0 ml-2" placeholder="Enter your password" />
            </div>
            {isLogin && (
              <div className='w-full text-right'>
               <a href="/forgot-password" className="hover:font-semibold duration-300 my-4 text-[#00D97E]">Forgot your password?</a>
             </div>
            )}
            
            
          </div>
         

          {!isLogin && (
            <div className="mb-4 w-full">
              <label className="flex items-center text-[12px]">
                
                <p>By continuing, you're agreeing to our <span className='text-[#00D97E]'>Terms & Conditions</span> and <span className='text-[#00D97E]'>Privacy Policy</span></p>
              </label>
            </div>
          )}

          <button type="submit" className="bg-[#00D97E] text-white py-2 mb-6 mt-2 px-8 rounded-[30px] text-[14px] font-semibold">
            {isLogin ? 'SIGN IN' : 'SIGN UP'}
          </button>


          <div className="text-center mt-4 lg:hidden">
            {isLogin ? (
              <>
                
                <p className="mt-2">
                  Don't have an account? <a href="/signup" className="text-[#00D97E]">Sign Up</a>
                </p>
              </>
            ) : (
              <p>
                Already have an account? <a href="/login" className="text-[#00D97E]">Login</a>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
