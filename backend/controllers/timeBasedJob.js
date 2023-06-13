import { createTimeBasedJobRecord, readTimeBasedJobRecord } from "../helpers/polybaseQueries.js";
import { ethers } from "ethers";
import randomstring from "randomstring";
import Job from "../models/Job.js";

export const postJobHandler = async (req, res, next) => {
    const { contractAddress, functionName, ABI, scheduledBy, params, scheduledTime } = req.body;

    try {
        const randomId = randomstring.generate() + contractAddress;
        const formattedContractAddress = ethers.utils.getAddress(contractAddress);
        const formattedScheduledBy = ethers.utils.getAddress(scheduledBy);        

        const response = await createTimeBasedJobRecord( randomId, formattedContractAddress, ABI, functionName, formattedScheduledBy, params, Number(scheduledTime), Math.floor((Date.now() / 1000)));

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

};
