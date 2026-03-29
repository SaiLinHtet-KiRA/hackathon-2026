import { Router } from "express";
import ReportController from "../controller/Report.controller";

const router = Router();

router.get("/report", ReportController.getReports);
router.post("/report", ReportController.createReport);
router.get("/report/:id", ReportController.getReport);
router.patch("/report/:id", ReportController.updateReport);
router.delete("/report/:id", ReportController.deleteReport);

export default router;
