import { Router } from "express";
import { handleCreateUser, handleGetUser, handleUpdateUser } from "../controllers/users.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", handleCreateUser);
router.get("/:id", handleGetUser);

router.use(requireAuth);
router.put("/:id", handleUpdateUser);

export default router;
