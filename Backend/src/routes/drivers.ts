import { Router } from "express";
import * as ctrl from "../controllers/driversController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(ctrl.listDrivers));
router.get("/:id", asyncHandler(ctrl.getDriver));
router.post("/", asyncHandler(ctrl.createDriver));
router.put("/:id", asyncHandler(ctrl.updateDriver));
router.delete("/:id", asyncHandler(ctrl.deleteDriver));

export default router;
