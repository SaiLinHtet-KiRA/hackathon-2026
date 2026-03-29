import { Router } from "express";
import IncidentsRoute from "./Incidents.route";
import IncidentRoute from "./Incident.route";
import ReportsRoute from "./reports.route";
import ReportRoute from "./report.route";
import UnitRoute from "./unit.route";
import ResponderUnitRoute from "./ResponderUnit.route";

import CCTVRoute from "./cctv.route";

const router = Router();

router.get("/checkhealth", (req, res) => res.status(200).json("All good"));
router.use(IncidentsRoute);
router.use(IncidentRoute);
router.use(CCTVRoute);
router.use(ReportsRoute);
router.use(ReportRoute);
router.use(UnitRoute);
router.use(ResponderUnitRoute);

export default router;
