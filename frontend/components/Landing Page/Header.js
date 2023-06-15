import Image from 'next/image';
import React from 'react';
import { BsArrowRightShort } from 'react-icons/bs';

const Header = () => {
  return (
    <section>
      <nav className='flex justify-between px-20 py-4 border-b bg-white'>
        <p className='font-semibold font-Poppins text-2xl'>easyJob.</p>
        <div className='flex gap-8 items-center font-Poppins'>
          <p>Home</p>
          <button className='bg-[#1e1e1e] flex items-center justify-center gap-2 py-2 px-4  text-white rounded-xl '>
            Go to Dashboard{' '}
            <span>
              <BsArrowRightShort size={22} />
            </span>
          </button>
        </div>
      </nav>
      <header className='flex mx-auto mt-3 h-[90vh] overflow-hidden '>
        <div className='flex-[0.4] px-20 flex flex-col justify-center'>
          <h2 className='text-8xl font-Poppins font-medium leading-[105px]'>
            All-in-one <br />
            automation <br />
            platform
          </h2>

          <p className='font-Poppins text-xl font-normal mt-10'>
            Enabling Web3 developers to automate and operate smart contract
            functions with ease on{' '}
            <span className='text-[#6736F1] font-semibold'>FVM</span>.
          </p>

          <button className='bg-[#1e1e1e] flex items-center justify-center gap-2 py-3 w-[230px] mt-10 text-white rounded-xl text-2xl'>
            Launch App{' '}
            <span>
              <BsArrowRightShort size={25} />
            </span>
          </button>
        </div>

        <div className='flex-[0.6]  '>
          <Image
            className='absolute -right-72 -z-10 top-10 -rotate-[20deg]'
            src='/svgs/hero.svg'
            height={1000}
            width={1000}
            alt='hero img'
          />
        </div>
      </header>
    </section>
  );
};

export default Header;
