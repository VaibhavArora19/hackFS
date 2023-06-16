import React from 'react';
import Backdrop from '../Backdrop';
import Loader from '../Loader';
import { BsCheck } from 'react-icons/bs';

const ProcessingAutomationModal = ({ onClose, loading }) => {
  return (
    <div>
      <Backdrop onClose={onClose} />
      <div className='w-[550px] min-h-[300px] font-Poppins text-[#EDEDEF] font-semibold text-2xl bg-[black] p-10 rounded-2xl fixed top-[50%] left-[50%] shadow-2xl -translate-x-[50%] -translate-y-[50%] z-10 rounded-b-2xl  overflow-hidden border border-gray-900'>
        <p className='text-center mb-7'>Processing Automation</p>

        {loading ? (
          <Loader inComp={true} />
        ) : (
          <div className='flex justify-center items-center h-[200px] flex-col'>
            <BsCheck
              size={90}
              className='p-2 rounded-full bg-purple-800 text-purple-300'
            />

            <p className='text-xs font-medium mt-5 text-purple-300'>
              Automation successfully setuped
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessingAutomationModal;
