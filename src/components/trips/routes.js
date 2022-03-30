import { Router } from "express";
import { createTrip, retrieveTrips } from "./controller";

const router = Router();

router.post('/', createTrip);
router.get('/', retrieveTrips);

export default router;