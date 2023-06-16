import React from 'react';
import { useState, useEffect } from 'react';
import ParameterInput from './ParameterInput';

const SelectFunction = ({ setPage, page, formData, setFormData }) => {
  const [mutableFuncs, setMutableFuncs] = useState([]);
  const [selectedFun, setSelectedFun] = useState(null);

  useEffect(() => {
    const parsedData = JSON.parse(formData.contractAbi);
    const funcs = parsedData.filter((fun) => {
      return (
        fun.stateMutability !== 'view' &&
        fun.stateMutability !== 'pure' &&
        fun.type === 'function'
      );
    });
    setMutableFuncs(funcs);
  }, []);

  const handleSelectChange = (event) => {
    const selectedFunction = mutableFuncs[event.target.value];
    setSelectedFun(selectedFunction);
  };

  const nextPageHandler = () => {
    setFormData({ ...formData, function: selectedFun });
    setPage((currPage) => currPage + 1);
  };

  const previousPageHandler = () => {
    setPage((currPage) => currPage - 1);
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

              {selectedFun.inputs?.map((input, index) => (
                <div className='flex mb-3 items-center'>
                  <ParameterInput
                    setFormData={setFormData}
                    formData={formData}
                    input={input}
                    index={index}
                  />
                </div>
              ))}
            </>
          ) : (
            ''
          )}
        </div>
        <p onClick={previousPageHandler}>Prev</p>
        <p onClick={nextPageHandler}>Next</p>
      </div>
    </div>
  );
};

export default SelectFunction;
