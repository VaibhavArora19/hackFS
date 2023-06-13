import { getTimeBasedReadInstance } from "./polybaseQueries.js";
import { createPublicClient, createWalletClient, http } from "viem";
import { filecoinHyperspace } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

export const getAllJobs = async (jobIdArray) => {

    const timeBasedJobs = jobIdArray.filter((jobDetail) => jobDetail.jobType === "timeBased");

    const pendingJobDetails = [];

    for(const singleJob of timeBasedJobs) {
        const readJobDataInstance = getTimeBasedReadInstance(singleJob);
        pendingJobDetails.push(readJobDataInstance);
    }

    const promiseResponse = await Promise.all(pendingJobDetails);

    const jobDetails = promiseResponse.map((response) => {
        return response.data
    })

    return jobDetails;
};

export const filterJobs = (jobDetails) => {

    const filteredJobs = jobDetails.filter((job) => { 
        return job.isExecuted === false && scheduledTime <= Math.floor((Date.now())/1000)
    })

    return filteredJobs;
}

export const executeJob = async (jobDetail) => {

    // const publicClient = createPublicClient({
    //     chain: filecoinHyperspace,
    //     transport: http()
    // });

    const walletClient = createWalletClient({
        account: privateKeyToAccount(process.env.PRIVATE_KEY),
        chain: filecoinHyperspace,
        transport: http()
    });

     await walletClient.writeContract({
        address: jobDetail.contractAddress,
        abi: jobDetail.ABI,
        functionName: jobDetail.functionName,
        args: jobDetail.params
     })

}