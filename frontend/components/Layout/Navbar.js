import React from 'react';
import { BsArrowRightShort } from 'react-icons/bs';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();

  return (
    <nav
      className={`flex justify-between px-20 py-4 border-b border-gray-900 ${
        router.pathname === '/' ? 'bg-white' : 'bg-[#18181A]'
      }`}>
      <p
        className={`font-semibold font-Poppins text-2xl ${
          router.pathname === '/' ? 'text-black' : 'text-[#EDEDEF]'
        }`}>
        easyJob.
      </p>
      <div className='flex gap-8 items-center font-Poppins'>
        <p
          className={`${
            router.pathname === '/' ? 'text-black' : 'text-[#EDEDEF]'
          }`}>
          Home
        </p>
        <button
          className={`flex items-center justify-center gap-2 py-2 px-4 ${
            router.pathname === '/' ? 'bg-black ' : 'bg-[#443592]'
          }  rounded-xl text-[#EDEDEF]`}>
          Go to Dashboard{' '}
          <span>
            <BsArrowRightShort size={22} />
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
