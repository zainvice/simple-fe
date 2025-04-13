import React from 'react';
import Button from '../../common/button';

const LostPage = () => {
    return (
        <div className='w-full'>
            <div className='w-full flex justify-between lg:p-8 p-4'>
                <a className='flex lg:ml-6' href='/'>
                    <img src="/logodark-icon.png" alt="Logo" className="h-12 lg:ml-6 ml-3" />
                    <p className='hidden lg:block text-[28px] ml-2 text-[#1EBDB8] font-medium'>Simple</p>
                </a>
                <div className='flex text-[#888888] mr-5'>
                <div className='flex text-[#888888] mt-2'>
                    <span class="material-symbols-outlined mx-2"> lock </span>
                    Protected
                    </div>
                    <div className='mx-2 mt-2'>
                    |
                    </div>
                <div>
                    <Button text={'SIGN UP'}  onClick={(e)=> window.location.href = '/signup'}/>
                </div>
          </div>
            </div>
            <div className='flex flex-col item-center justify-center'>
                <img src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg" alt="404Img" className='mx-auto rounded-full shadow-md'/>
                <h1 className='mx-auto text-[40px] poppins font-bold text-[#1EBDB8] my-10'>ARE YOU LOST?</h1>
                <div className='mx-auto'>
                    <Button text={'BACK TO HOMEPAGE'}  onClick={(e)=> window.location.href = '/'}/>
                </div>
            </div>
            
        </div>
    );
}

export default LostPage;