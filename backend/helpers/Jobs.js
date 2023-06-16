import { getTimeBasedReadInstance, markJobAsExecuted, getCustomJobReadInstance, increaseExecutionCount } from "./polybaseQueries.js";
import { createPublicClient, createWalletClient, http } from "viem";
import { filecoinHyperspace } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { sendNotification } from "../push/index.js";
import { keeperAddress, ABI } from "../lib/constant.js";

export const getAllJobs = async (jobIdArray) => {

    const timeBasedJobs = jobIdArray.filter((jobDetail) => jobDetail.jobType === "timeBased");

    const pendingJobDetails = [];

    for(const singleJob of timeBasedJobs) {
        const readJobDataInstance = getTimeBasedReadInstance(singleJob.polybaseId);
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
    try {
        const walletClient = createWalletClient({
            account: privateKeyToAccount("0x" + process.env.PRIVATE_KEY),
            chain: filecoinHyperspace,
            transport: http()
        });

        await walletClient.writeContract({
            address: jobDetail.contractAddress,
            abi: JSON.parse(jobDetail.ABI),
            functionName: jobDetail.functionName,
            args: jobDetail.params
        });


        await markJobAsExecuted(jobDetail.polybaseId);

        sendNotification(jobDetail.scheduledBy, "Cron Job Executed", `Hey! The time based cron job ${jobDetail.name} you scheduled earlier has been executed successfully 🙌. All the information regarding your cron job are as follows :- ${jobDetail}`);

    } catch(err) {
        console.log("err is", err);
    }
}

export const executeScheduledJobs = async (jobIdArray) => {
    
    const allJobs = await getAllJobs(jobIdArray);

    const scheduledJobs = filterJobs(allJobs);

    for(const scheduledJob of scheduledJobs) {
        await executeJob(scheduledJob);
    }


}

export const getAllCustomJobs = async (jobIdArray) => {
    const customJobs = await jobIdArray.filter((jobDetail) => jobDetail.jobType === "custom");

    const pendingJobDetails = [];

    for(const singleJob of customJobs) {
        const readJobDataInstance = getCustomJobReadInstance(singleJob.polybaseId);
        pendingJobDetails.push(readJobDataInstance);
    }

    const promiseResponse = await Promise.all(pendingJobDetails);

    const jobDetails = promiseResponse.map((response) => {
        return response.data
    })

    return jobDetails;
};

export const executeCustomJobs = async (jobDetails) => {
    const allJobs = await getAllCustomJobs(jobIdArray);

    const publicClient = createPublicClient({
        chain: filecoinHyperspace,
        transport: http()
    });

    const walletClient = createWalletClient({
        account: privateKeyToAccount("0x" + process.env.PRIVATE_KEY),
        chain: filecoinHyperspace,
        transport: http()
    });

    for(const job of allJobs) {
        const isExecutionNeeded = await publicClient.readContract({
            address: job.contractAddress,
            abi: JSON.parse(job.ABI),
            functionName: 'check',
        })

        if(isExecutionNeeded) {
            await walletClient.writeContract({
                address: keeperAddress,
                abi: ABI,
                functionName: 'call',
                args: [job.contractAddress, job.value, job.data]
            });

            await increaseExecutionCount(Date.now() / 1000);

            sendNotification(job.scheduledBy, 'Cron Job Executed', `Hey the custom cron job ${job.name} that you scheduled earlier has been executed successfully 🙌. All the information regarding your cron job are as follows :- ${job}`)
        }
    }
    
}