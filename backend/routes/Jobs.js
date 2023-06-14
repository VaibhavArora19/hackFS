import express from "express";
import { postJobHandler, getJobHandler, getAllJobsByUser } from "../controllers/timeBasedJob.js";

const router = express.Router();

router.get('/job/timebased/:id', getJobHandler);
router.post('/job/timebased', postJobHandler);
router.get('/user/job/:userAddress', getAllJobsByUser);

export default router;