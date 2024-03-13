import express from "express";
import {
  authUser,
  deleteUser,
  getUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleWare.js";

const router = express.Router();

/**
 * @description   register user and getA token
 * @route          POST /api/users/
 * @access         Public
 *
 * */
router.route("/").post(registerUser).get(protect, admin, getUsers);

/**
 * @description   Auth user and get token
 * @route          POST /api/users/login
 * @access         Public
 *
 * */
router.post("/login", authUser);

/**
 * @description   Auth user and get token
 * @route          GET /api/users/profile
 * @access         Private
 *
 * */
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUser)
  .put(protect, admin, updateUser);
export default router;
