import Introduction from '@/components/CreateJob/Introduction';
import ContractDetails from '@/components/CreateJob/ContractDetails';
import React from 'react';
import SelectType from '@/components/CreateJob/SelectType';
import SelectFunction from '@/components/CreateJob/SelectFunction';
import JobDetails from '@/components/CreateJob/JobDetails';

const Create = () => {
  return (
    <div className='flex justify-center items-center min-h-[95vh] bg-[#1C1C1F]'>
      {/* <Introduction /> */}
      <SelectType />
      {/* <SelectFunction /> */}
      {/* <ContractDetails /> */}
      {/* <SelectFunction /> */}
      {/* <JobDetails /> */}
    </div>
  );
};

export default Create;
