import express from "express";
import {
  findUsers,
  findUser,
  deleteUser,
  getUserFollowing,
  followOrUnfollow,
  updateUser,
  getUserProfile,
  getUserFollowers,
  uploadAvatar,
} from "../controllers/users.controller.mjs";
import { verifyJWT } from "../middleware/auth.middleware.mjs";
import uplaod from "../middleware/multer.middleware.mjs";

const router = express.Router();

router.get("/", verifyJWT, findUsers);
router.get("/:id", verifyJWT, findUser);
router.get("/profile/:username", getUserProfile);
router.delete("/:id", verifyJWT, deleteUser);
router.patch("/:id", verifyJWT, updateUser);
router.patch("/:id/avatar", verifyJWT, uplaod.single("image"), uploadAvatar);

router.get("/following/:id", verifyJWT, getUserFollowing);
router.get("/followers/:id", verifyJWT, getUserFollowers);
router.patch("/follow/:id", verifyJWT, followOrUnfollow);

export default router;
