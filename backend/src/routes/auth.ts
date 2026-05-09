import { Router } from "express";
import { handleGetMe, handleLogin, handleLogout, handleRefresh, handleSignUp } from "../controllers/auth.js";

const router = Router();

router.post("/signup", handleSignUp);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);
router.post("/refresh", handleRefresh);
router.get("/me", handleGetMe);

export default router;
