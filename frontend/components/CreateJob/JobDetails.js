import React, { useState } from 'react';

const JobDetails = ({ setPage, page, formData, setFormData }) => {
  const [cronTime, setCronTime] = useState('');

  const previousPageHandler = () => {
    setPage((currPage) => currPage - 1);
  };
  const submitHandler = () => {
    setFormData({ ...formData, cronTime: cronTime });
    console.log('Form Data', formData);
  };

  return (
    <div className='text-white w-[600px] font-Poppins bg-[#181818] py-10 px-10 rounded-xl border border-gray-900 shadow-md'>
      <h2 className='text-2xl font-semibold mb-7'>Job details</h2>

      <div className='flex flex-col '>
        {formData.automationType === 'time' ? (
          <>
            <label className='text-sm text-gray-400'>Cron expression</label>
            <input
              onChange={(e) => {
                setCronTime(e.target.value);
              }}
              required
              value={cronTime}
              type='text'
              placeholder='* * * * *'
              className='bg-[#232327] py-2 px-2 border border-gray-900 rounded-md placeholder:text-gray-500 text-gray-300 my-1 outline-none mb-4'
            />
            <div className='flex gap-4 flex-wrap'>
              <p
                onClick={() => {
                  setCronTime('*/15 * * * *');
                }}
                className='text-xs py-2 px-2 bg-purple-700 text-purple-300 rounded-md w-fit cursor-pointer hover:bg-purple-800'>
                Every 15 mins
              </p>
              <p
                onClick={() => {
                  setCronTime('0 * * * *');
                }}
                className='text-xs py-2 px-2 bg-purple-700 text-purple-300 rounded-md w-fit cursor-pointer hover:bg-purple-800'>
                Every hour
              </p>
              <p
                onClick={() => {
                  setCronTime('0 0 1 * *');
                }}
                className='text-xs py-2 px-2 bg-purple-700 text-purple-300 rounded-md w-fit cursor-pointer hover:bg-purple-800'>
                First of every month
              </p>
              <p
                onClick={() => {
                  setCronTime('30 */2 * * 1-5');
                }}
                className='text-xs py-2 px-2 bg-purple-700 text-purple-300 rounded-md w-fit cursor-pointer hover:bg-purple-800'>
                30 mins past every two hours on every weekday
              </p>
              <p
                onClick={() => {
                  setCronTime('0 8,16 * * 1,3,5');
                }}
                className='text-xs py-2 px-2 bg-purple-700 text-purple-300 rounded-md w-fit cursor-pointer hover:bg-purple-800'>
                Monday, Wednesday, Friday at 8:00 & 16:00
              </p>
            </div>
          </>
        ) : (
          ''
        )}

        <label className='text-sm text-gray-400 mt-4'>Job name</label>
        <input
          required
          onChange={(event) => {
            setFormData({ ...formData, jobName: event.target.value });
          }}
          value={formData.jobName}
          type='text'
          placeholder=''
          className='bg-[#232327] py-2 px-2 border border-gray-900 rounded-md placeholder:text-gray-500 text-gray-300 my-1 outline-none mb-6'
        />

        <label className='text-sm text-gray-400'>Admin address</label>
        <input
          required
          onChange={(event) => {
            setFormData({ ...formData, adminAddress: event.target.value });
          }}
          value={formData.adminAddress}
          type='text'
          className='bg-[#232327] py-2 px-2 border border-gray-900 rounded-md placeholder:text-gray-500 text-gray-300 my-1 outline-none mb-10'
        />
      </div>

      <p onClick={previousPageHandler}>Prev</p>
      <p onClick={submitHandler}>Submit</p>
    </div>
  );
};

export default JobDetails;
