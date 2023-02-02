import express from "express";
import {
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} from "../controllers/userController.js";
const router = express.Router();

// verify user
import { verifyUser } from "../utils/verifyToken.js";
import { verifyAdmin } from "../utils/verifyToken.js";
// update new user
router.put("/:id",verifyUser, updateUser);

// delete new user
router.delete("/:id",verifyUser, deleteUser);

// getSingle new user
router.get("/:id",verifyUser, getSingleUser);

// all new user
router.get("/",verifyAdmin, getAllUser);

export default router