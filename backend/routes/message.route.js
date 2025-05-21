import { Router } from "express";
import protectedRoute from "../middlwares/protectedRoute.js";
import { getMessage, getUserLoggedIn, sendMessage } from "../controller/message.controller.js";

const router = Router()

router.post("/:id",protectedRoute,sendMessage)
router.get("/getUser",protectedRoute,getUserLoggedIn)
router.get("/:id",protectedRoute,getMessage)

export default router