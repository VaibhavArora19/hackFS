import { ethers } from "ethers";
import { getUserInfo } from "../helpers/polybaseQueries.js";
import { readTimeBasedJobRecordByAddress, readCustomJobRecordByAddress } from "../helpers/polybaseQueries.js";

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


export const getAllDetailedJobs = async (req, res, next) => {
    const { userAddress } = req.params;

    try {
        const formattedUserAddress = ethers.utils.getAddress(userAddress);

        const timeBasedJobs = await readTimeBasedJobRecordByAddress(formattedUserAddress);

        const customJobs = await readCustomJobRecordByAddress(formattedUserAddress);

        if(timeBasedJobs.data === null || customElements.data === null) {
            throw new Error("Something went wrong");
        }
        const allJobs = [...timeBasedJobs, ...customJobs];
        
        res.status(200).json({ success: true, response: allJobs });
    }catch(err) {
        next(err);
    }
}