import express from "express";
import { register, login, getUsers, } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/users", authMiddleware, getUsers);

export default router;