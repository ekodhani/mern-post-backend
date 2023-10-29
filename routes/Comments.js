const express = require("express");
const { Comments } = require("../models");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");

// method GET berdasarkan postId tertentu
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { PostId: postId } });
  res.json(comments);
});

// method POST untuk mengirim comment dan validateToken sebagai middleware
router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  const username = req.user.username;
  comment.username = username;

  await Comments.create(comment);
  res.json(comment);
});

module.exports = router;
