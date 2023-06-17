import { convertEpochToLocalTime } from '@/utils';
import Image from 'next/image';
import React from 'react';
import { AiOutlineDeploymentUnit } from 'react-icons/ai';

const Job = ({
  jobName,
  automationType,
  isExecuted,
  functionName,
  registeredDate,
  contractAddress,
  schedulerAddress,
  scheduledTime,
}) => {
  return (
    <div className='w-full bg-[#161618]  rounded-xl px-10 py-6'>
      <div className='flex justify-between items-center border-b border-[#2b2b2b] pb-2'>
        <div className='flex items-center gap-2'>
          <AiOutlineDeploymentUnit
            size={22}
            className='text-[#A09FA5]'
          />

          <p className='text-xl font-Poppins font-semibold text-[#EDEDEF]'>
            {jobName}
          </p>
        </div>

        {automationType === 'timebased' ? (
          <p className='bg-[#443592] text-purple-300 text-xs font-Poppins px-3 py-1 rounded-full'>
            Time based
          </p>
        ) : (
          <p className='bg-[#185160] text-blue-100 text-xs font-Poppins px-3 py-1 rounded-full'>
            Custom Logic
          </p>
        )}
      </div>

      <div className='py-4 flex flex-col gap-10 justify-between font-Poppins'>
        <div className='flex justify-between'>
          <div className='flex-[0.33] '>
            <p className='text-sm text-gray-400 font-semibold mb-2'>Status</p>

            {isExecuted ? (
              <p className='bg-green-600 font-semibold w-fit text-xs text-green-50 px-2 py-1 rounded-full'>
                Executed
              </p>
            ) : (
              <p className='bg-red-600 font-semibold w-fit text-xs text-red-50 px-2 py-1 rounded-full'>
                Not Executed
              </p>
            )}
          </div>

          <div className='flex-[0.33]'>
            <p className='text-sm text-gray-400 font-semibold mb-2'>Function</p>
            <p className='text-xl font-semibold text-[#EDEDEF]'>
              {functionName}
            </p>
          </div>

          <div className='flex-[0.33]'>
            <p className='text-sm text-gray-400 font-semibold mb-2'>
              Date Registered
            </p>

            <p className='text-xl font-semibold text-[#EDEDEF]'>
              {convertEpochToLocalTime(registeredDate)}
            </p>
          </div>
        </div>

        <div className='flex justify-between'>
          <div className='flex-[0.33]'>
            <p className='text-sm text-gray-400 font-semibold mb-2'>
              Contract Address
            </p>

            <div className='flex gap-2 items-center'>
              <Image
                src='/img.png'
                alt='img'
                height={20}
                width={30}
                className='rounded-md'
              />
              <p className='text-xl font-semibold text-[#EDEDEF]'>
                {contractAddress.slice(0, 5)}....
                {contractAddress.slice(contractAddress.length - 4)}
              </p>
            </div>
          </div>

          <div className='flex-[0.33]'>
            <p className='text-sm text-gray-400 font-semibold mb-2'>
              Scheduler Address
            </p>

            <div className='flex gap-2 items-center'>
              <Image
                src='/img2.png'
                alt='img'
                height={20}
                width={30}
                className='rounded-md'
              />
              <p className='text-xl font-semibold text-[#EDEDEF]'>
                {schedulerAddress.slice(0, 3)}....
                {schedulerAddress.slice(schedulerAddress.length - 4)}
              </p>
            </div>
          </div>

          <div className='flex-[0.33]'>
            <p className='text-sm text-gray-400 font-semibold mb-2'>
              Scheduled Time
            </p>

            <p className='text-xl font-semibold text-[#EDEDEF]'>
              {convertEpochToLocalTime(scheduledTime)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
