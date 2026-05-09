import { Router } from "express";
import {
  handleCreateVehicle,
  handleDeleteVehicle,
  handleGetVehicle,
  handleListVehicles,
  handleUpdateVehicle,
} from "../controllers/vehicles.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", handleListVehicles);
router.get("/:id", handleGetVehicle);

router.use(requireAuth);
router.post("/", handleCreateVehicle);
router.put("/:id", handleUpdateVehicle);
router.delete("/:id", handleDeleteVehicle);

export default router;
