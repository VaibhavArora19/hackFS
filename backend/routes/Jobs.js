import express from "express";
import { postJobHandler, getJobHandler, getAllJobHandler } from "../controllers/timeBasedJob.js";

const router = express.Router();

router.post('/timebasedjob', postJobHandler);
router.get('/timebasedjob/:id', getJobHandler);
router.get('/timebasedjob', getAllJobHandler);

export default router;