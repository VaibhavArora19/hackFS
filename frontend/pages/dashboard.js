import Job from "@/components/Job/Job";
import React, { useState } from "react";
import { BsArrowDownShort } from "react-icons/bs";
import { useAccount } from "wagmi";
import LIT from "@/components/LIT/LIT";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const Dashboard = () => {
  const [jobData, setJobData] = useState([]);
  const [pkpWallet, setPkpWallet] = useState(null);

  const { address } = useAccount();

  const getData = async () => {
    try {
      const walletAddress = address ? address : pkpWallet.address;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" min-h-[95vh] bg-[#1C1C1F]">
      <div className="w-[95%] mx-auto py-10">
        {!(address || pkpWallet) ? (
          <div className="flex flex-col items-center gap-2">
            <LIT setPkpWallet={setPkpWallet} />
            <p className="text-center text-gray-300">or</p>
            <ConnectButton />
          </div>
        ) : (
          <div>
            <h2 className="text-xl flex items-center gap-3 font-semibold text-gray-400 font-Poppins ">
              My Automated Jobs <BsArrowDownShort size={25} />
            </h2>

            <div className="flex flex-col gap-5 mt-10 ">
              {jobData.map((job) => (
                <Job
                  automationType="timebased"
                  contractAddress="0x433F4d3ED23f169E465C06AB73c8e025f4e4f8Be"
                  functionName="transfer"
                  isExecuted={false}
                  scheduledTime={1687356180}
                  jobName="Test Job"
                  schedulerAddress="0x51EEBc7765b246a4D16d02b28CEAC61299AB7d9d"
                  registeredDate={1687000586}
                  noOfTimesExectued={0}
                  listOfTimesFuncExectued={[]}
                />
              ))}

              {/* Isko delete kr dena */}
              <Job
                automationType="customLogic"
                contractAddress="0x433F4d3ED23f169E465C06AB73c8e025f4e4f8Be"
                functionName="Proxy Call"
                isExecuted={true}
                scheduledTime={1687356180}
                jobName="Prxoy Job 3"
                schedulerAddress="0x51EEBc7765b246a4D16d02b28CEAC61299AB7d9d"
                registeredDate={1687000586}
                noOfTimesExectued={4}
                listOfTimesFuncExectued={[1687000586, 1687356180]}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
