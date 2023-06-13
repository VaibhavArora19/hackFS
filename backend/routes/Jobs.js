import express from "express";
import { postJobHandler, getJobHandler } from "../controllers/timeBasedJob.js";

const router = express.Router();

router.get('/job/timebased/:id', getJobHandler);
router.post('/job/timebased', postJobHandler);

export default router;