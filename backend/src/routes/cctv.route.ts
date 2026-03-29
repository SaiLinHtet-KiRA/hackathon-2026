import { Router } from "express";
import CCTVController from "../controller/CCTV.controller";

const router = Router();

router.get("/cctvs", CCTVController.getCCTVs);
router.post("/cctv", CCTVController.createCCTV);
router.get("/cctv/:id", CCTVController.getCCTV);
router.patch("/cctv/:id", CCTVController.updateCCTV);
router.delete("/cctv/:id", CCTVController.deleteCCTV);

export default router;
