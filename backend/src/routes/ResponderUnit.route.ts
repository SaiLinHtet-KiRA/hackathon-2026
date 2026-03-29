import { Router } from "express";
import ResponderUnitController from "../controller/ResponderUnit.controller";

const router = Router();

router.get("/responderUnits", ResponderUnitController.getResponderUnits);
router.post("/responderUnit", ResponderUnitController.createResponderUnit);
router.get("/responderUnit/:id", ResponderUnitController.getResponderUnit);
router.patch("/responderUnit/:id", ResponderUnitController.updateResponderUnit);
router.delete(
  "/responderUnit/:id",
  ResponderUnitController.deleteResponderUnit,
);

export default router;
