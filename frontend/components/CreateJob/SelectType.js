import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { GiBreakingChain, GiAlarmClock } from 'react-icons/gi';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
// import polygonSvg from '../../public/assets/deploy/polygon.svg';

const SelectType = () => {
  const [isMultichain, setIsMultichain] = useState(false);
  const [isSinlgeChain, setIsSingleChain] = useState(false);
  //   const [openModal, setOpenModal] = useState(false);
  const [chain, setChain] = useState({
    chainId: '',
    chainName: '',
    chainImg: '',
  });

  const multichainHandler = () => {
    setIsSingleChain(false);
    setIsMultichain(true);
  };

  const singleChainHandler = () => {
    setIsMultichain(false);
    setIsSingleChain(true);
  };

  const nextPageHandler = () => {
    if (chain.chainName.length) {
      setFormData({ ...formData, currentDeployChain: chain });
    }

    if (isSinlgeChain) {
      setPage((currPage) => currPage + 2);
    } else if (isMultichain) {
      setPage((currPage) => currPage + 1);
    } else {
      alert('Select single or multiple');
    }
  };

  const previousPageHandler = () => {
    setPage((currPage) => currPage - 1);
  };

  return (
    <div className='text-white w-[750px] bg-[#181818] py-10 px-10 rounded-xl border border-gray-900 shadow-md'>
      <h2 className='text-2xl font-semibold mb-7'>Select Automation Type</h2>

      <form className='flex flex-col '>
        <div className='flex gap-10 h-[250px]'>
          <div
            onClick={singleChainHandler}
            className={` ${
              isSinlgeChain ? 'bg-[#443592]' : 'bg-[#363636]'
            }  p-10 rounded-xl flex-[0.5] cursor-pointer`}>
            <div className='bg-[#171717] rounded-md p-4 w-fit mb-3'>
              <GiAlarmClock
                className={`${isSinlgeChain && 'text-purple-300'}`}
                size={20}
              />
            </div>

            <p className={`${isSinlgeChain && 'text-purple-300 '} font-medium`}>
              Time based
            </p>

            <p className='text-xs font-light mt-2 text-gray-300'>
              It uses a time schedule (CRON) to execute your smart contract
              function according to the schedule.
            </p>
          </div>

          <div
            onClick={multichainHandler}
            className={` ${
              isMultichain ? 'bg-[#281e5e]' : 'bg-[#363636]'
            } p-10 rounded-xl flex-[0.5] cursor-pointer`}>
            <div className='bg-[#171717] rounded-md p-4 w-fit mb-3'>
              <GiBreakingChain
                size={20}
                className={`${isMultichain ? 'text-purple-300' : ''}`}
              />
            </div>
            <p
              className={`${
                isMultichain ? 'text-purple-300' : ''
              } font-medium`}>
              Custom Logic
            </p>
            <p className='text-xs font-light mt-2 text-gray-300'>
              Custom logic uses an Automation-compatible contract that you
              deployed to determine when to perform your task.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SelectType;
