import { createTimeBasedJobRecord, readTimeBasedJobRecord, createNewUser, addTimeBasedJobReference, getUserInfo } from "../helpers/polybaseQueries.js";
import { ethers } from "ethers";
import randomstring from "randomstring";
import Job from "../models/Job.js";
import Account from "../models/Account.js";

export const postJobHandler = async (req, res, next) => {
    const { contractAddress, functionName, ABI, scheduledBy, params, scheduledTime } = req.body;

    try {
        const randomId = randomstring.generate() + contractAddress;
        const formattedContractAddress = ethers.utils.getAddress(contractAddress);
        const formattedScheduledBy = ethers.utils.getAddress(scheduledBy);        

        const response = await createTimeBasedJobRecord( randomId, formattedContractAddress, ABI, functionName, formattedScheduledBy, params, Number(scheduledTime), Math.floor((Date.now() / 1000)));

        if(response.data === null) {
            throw new Error("Creating a time based job failed!");
        }

        const account = await Account.findOne({ address: formattedScheduledBy });

        if(!account) {
            const response = await createNewUser(formattedScheduledBy);
            console.log('response is', response);
            if(response.data === null) {
                throw new Error("Creating a new user failed!");
            }

            const newAccount = new Account({
                address: formattedScheduledBy
            });

            await newAccount.save();

        }
        //yaha pr atak rha hai saying Add .signer() to populate ctx.publicKey, see: https://polybase.xyz/docs/authentication
        const userResponse = await addTimeBasedJobReference(formattedScheduledBy, randomId);
        
        if(userResponse.data === null) {
            throw new Error("Adding time based reference failed");
        }

        const newJob = new Job({
            jobType: "timeBased",
            polybaseId: response.data.id
        });

        await newJob.save();

        res.status(201).json({ success: true, message: 'Time based job created successfully'});

    } catch (err) {
        next(err);
    }


};

export const getJobHandler = async (req, res, next) => {
    const { id } = req.params;

    try {

        const response = await readTimeBasedJobRecord(id);
        
        if(response.data === null) {
            return res.status(404).json({ success: false, response: "No Job Found!"});
        }

        res.status(201).json({ success: true, response: response.data });
    
    } catch(err) {
        next(err);
    }

};

export const getAllJobsByUser = async (req, res, next) => {
    const { userAddress } = req.params;

    try {
        const formattedUserAddress = ethers.utils.getAddress(userAddress);
        
        const response = await getUserInfo(formattedUserAddress);

        if(response.data === null) {
            throw new Error("Something went wrong");
        }

        res.status(200).json({ success: true, response: response });
    } catch (err) {
        next(err);
    }
};
