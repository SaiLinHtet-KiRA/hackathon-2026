import { Router } from "express";
import IncidentsController from "../controller/Incidents.controller";

const router = Router();

router.get("/incidents/:id", IncidentsController.getIncidents);
router.patch("/incidents/:id", IncidentsController.updateIncidents);
router.delete("/incidents/:id", IncidentsController.deleteIncidents);

export default router;
