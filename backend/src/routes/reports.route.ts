import { Router } from "express";
import ReportsController from "../controller/Reports.controller";

const router = Router();

router.get("/reports/:id", ReportsController.getReports);
router.patch("/reports/:id", ReportsController.updateReports);
router.delete("/reports/:id", ReportsController.deleteReports);

export default router;
