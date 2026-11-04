import express from "express";
import { register, login, getUsers, deleteAccount } from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/register", register);


router.post("/login", login);


router.get("/users", authMiddleware, getUsers);

router.delete("/users/me", authMiddleware, deleteAccount);

export default router;