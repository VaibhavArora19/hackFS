import express from "express";
import jobController from "../controllers/timeBasedJob";

const router = express.Router();

router.post('/timebasedjob', jobController.postJobHandler);
router.get('/timebasedjob', jobController.getJobHandler);

export default router;