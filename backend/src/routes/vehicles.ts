import { Router } from "express";
import {
  handleCreateVehicle,
  handleDeleteVehicle,
  handleGetVehicle,
  handleListVehicles,
  handleUpdateVehicle,
} from "../controllers/vehicles.js";

const router = Router();

router.get("/", handleListVehicles);
router.get("/:id", handleGetVehicle);
router.post("/", handleCreateVehicle);
router.put("/:id", handleUpdateVehicle);
router.delete("/:id", handleDeleteVehicle);

export default router;
