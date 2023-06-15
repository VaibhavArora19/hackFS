import React from 'react';
import dummyABI from '../../abi/dummyABI.json';
import { useState, useEffect } from 'react';

const SelectFunction = () => {
  const [mutableFuncs, setMutableFuncs] = useState([]);
  const [selectedFun, setSelectedFun] = useState(null);

  useEffect(() => {
    const funcs = dummyABI.abi.filter((fun) => {
      return (
        fun.stateMutability !== 'view' &&
        fun.stateMutability !== 'pure' &&
        fun.type === 'function'
      );
    });
    setMutableFuncs(funcs);
  }, []);

  const handleSelectChange = (event) => {
    const selectedFunc = mutableFuncs[event.target.value];
    console.log(selectedFunc);
    setSelectedFun(selectedFunc);
  };

  return (
    <div>
      <div className='text-white w-[600px] font-Poppins bg-[#181818] py-10 px-10 rounded-xl border border-gray-900 shadow-md'>
        <h2 className='text-2xl font-semibold mb-7'>
          Select Function to Automate
        </h2>

        <div className='flex flex-col '>
          <label className='text-sm text-gray-400 mb-1'>Function</label>
          <select
            onChange={handleSelectChange}
            class='bg-[#232327] outline-none border border-gray-900 mb-4  py-3 px-2 text-white text-sm rounded-lg '>
            <option selected>Select function here</option>
            {mutableFuncs.map((fun, index) => (
              <option
                key={index}
                value={index}>
                {fun.name}
              </option>
            ))}
          </select>

          {selectedFun?.inputs.length ? (
            <>
              <label className='text-sm text-gray-400 mb-3'>
                Input Parameters
              </label>

              {selectedFun.inputs?.map((input) => (
                <div className='flex mb-3 items-center'>
                  <label className='flex-[0.35] text-sm text-purple-800'>
                    {input.type}
                  </label>
                  <input
                    className='flex-[0.65] py-2 px-2 border rounded bg-[#232327] border-gray-900 text-sm'
                    type='text'
                    placeholder={input.name}
                  />
                </div>
              ))}
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectFunction;
