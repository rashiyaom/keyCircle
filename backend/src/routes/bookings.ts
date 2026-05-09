import { Router } from "express";
import {
  handleListBookings,
  handleGetBooking,
  handleCreateBooking,
  handleUpdateBooking,
  handleDeleteBooking,
} from "../controllers/bookings.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);

router.get("/", handleListBookings);
router.get("/:id", handleGetBooking);
router.post("/", handleCreateBooking);
router.put("/:id", handleUpdateBooking);
router.delete("/:id", handleDeleteBooking);

export default router;
