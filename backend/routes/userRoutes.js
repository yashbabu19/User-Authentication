import express from "express";
import {
  authUser,
  registerUser,
  userprofile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
 router.route("/profile").post(protect, userprofile);

export default router;
