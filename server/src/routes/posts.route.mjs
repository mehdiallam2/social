import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.mjs";
import {
  createPost,
  getPosts,
  getPost,
  likeUnlikePost,
  commentOnPost,
  deletePost,
} from "../controllers/posts.controller.mjs";

const router = express.Router();

router.get("/", verifyJWT, getPosts);
router.get("/:id", verifyJWT, getPost);
router.post("/", verifyJWT, createPost);
router.delete("/:id", verifyJWT, deletePost);

router.patch("/like/:id", verifyJWT, likeUnlikePost);
router.post("/comment/:id", verifyJWT, commentOnPost);

export default router;
