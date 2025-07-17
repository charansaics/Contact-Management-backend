import express from "express";
import { currentUser, loginUser, registerUser, logoutUser } from "../controllers/userController.js";
import { validateToken } from "../middlewares/validateTokenHandler.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/logout", logoutUser);

userRouter.get("/current", validateToken, currentUser);

export {userRouter};