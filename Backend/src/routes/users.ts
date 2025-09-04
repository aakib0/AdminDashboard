import { Router } from "express";
import * as ctrl from "../controllers/usersController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(ctrl.listUsers));
router.get("/:id", asyncHandler(ctrl.getUser));
router.post("/", asyncHandler(ctrl.createUser));
router.put("/:id", asyncHandler(ctrl.updateUser));
router.delete("/:id", asyncHandler(ctrl.deleteUser));

export default router;
