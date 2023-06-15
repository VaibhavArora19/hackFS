import express from "express";
import { postJobHandler, getJobHandler, getTimeBasedJobByUser } from "../controllers/timeBasedJob.js";
import { getAllJobsByUser } from "../controllers/allJobs.js";
import { postCustomJobHandler } from "../controllers/customJob.js";

const router = express.Router();

router.get('/job/timebased/:id', getJobHandler);
router.post('/job/timebased', postJobHandler);
router.get('/user/job/:userAddress', getAllJobsByUser);
router.get('/user/timebasedjobs/:userAddress', getTimeBasedJobByUser);
router.post('/job/custom',  postCustomJobHandler);

export default router;