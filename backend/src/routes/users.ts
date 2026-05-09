import { Router } from "express";
import { handleCreateUser, handleGetUser, handleUpdateUser } from "../controllers/users.js";

const router = Router();

router.post("/", handleCreateUser);
router.get("/:id", handleGetUser);
router.put("/:id", handleUpdateUser);

export default router;
