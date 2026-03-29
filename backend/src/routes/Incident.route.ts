import { Router } from "express";
import IncidentController from "../controller/Incident.controller";

const router = Router();

router.get("/incident", IncidentController.getIncidents);
router.post("/incident", IncidentController.createIncident);
router.get("/incident/:id", IncidentController.getIncident);
router.patch("/incident/:id", IncidentController.updateIncident);
router.delete("/incident/:id", IncidentController.deleteIncident);

export default router;
