import { Router } from "express";
import UnitController from "../controller/Unit.controller";

const router = Router();

router.get("/units", UnitController.getUnits);
router.post("/unit", UnitController.createUnit);
router.get("/unit/:id", UnitController.getUnit);
router.patch("/unit/:id", UnitController.updateUnit);
router.delete("/unit/:id", UnitController.deleteUnit);

export default router;
