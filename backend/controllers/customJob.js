import { ethers } from "ethers";
import randomstring from "randomstring";
import { addCustomJobReference, createCustomJobRecord, readCustomBasedJobRecord } from "../helpers/polybaseQueries";
import Account from "../models/Account";

export const postCustomJobHandler = async (req, res, next) => {
    const { contractAddress, value, data, scheduledBy } = req.body;

    try {
        const formattedContractAddress = ethers.utils.getAddress(contractAddress);
        const randomId = randomstring.generate() + formattedContractAddress;
        const formattedScheduledBy = ethers.utils.getAddress(scheduledBy);

        const response = await createCustomJobRecord(randomId, formattedContractAddress, JSON.stringify(ABI), formattedScheduledBy, value, data);

        if(response.data ===  null) {
            throw new Error("Creating a custom job failed");
        }

        const account = await Account.findOne({ address: formattedScheduledBy});

        if(!account) {
            const response = await createNewUser(formattedScheduledBy);
            if(response.data === null) {
                throw new Error("Creating a new user failed!");
            }

            const newAccount = new Account({
                address: formattedScheduledBy
            });

            await newAccount.save();
        }

        const userResponse = await addCustomJobReference(formattedScheduledBy, randomId);

        if(userResponse.data === null) {
            throw new Error("Adding custom based reference failed");
        }

        const newJob = new Job({
            jobType: "custom",
            polybaseId: response.data.id
        });

        await newJob.save();

        res.status(201).json({ success: true, message: 'Custom job created successfully'});

    } catch (err) {
        next(err);
    }
 
};

export const getCustomJobHandler = async (req, res, next) => {
    const { id } = req.params;

    try {

        const response = await readCustomBasedJobRecord(id);
        
        if(response.data === null) {
            return res.status(404).json({ success: false, response: "No Job Found!"});
        }

        res.status(201).json({ success: true, response: response.data });
    
    } catch(err) {
        next(err);
    }

};

export const getCustomJobByUser = async (req, res, next) => {
    const { userAddress } = req.params;
    try {
        const jobs = await readCustomJobRecordByAddress(userAddress);

        res.status(200).json({ success: true, response: jobs });
    } catch(err) {
        next(err)
    }
}