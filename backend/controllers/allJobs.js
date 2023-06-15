import { ethers } from "ethers";
import { getUserInfo } from "../helpers/polybaseQueries.js";

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