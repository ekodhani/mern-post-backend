const express = require("express");
const { Likes } = require("../models");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");

// method POST untuk memberi like pada satu post dengan user tertentu
router.post("/", validateToken, async (req, res) => {
  const { PostId } = req.body; // satu post yang akan diberi like
  const UserId = req.user.id; // siapa user yang memberi like (harus ada token)

  const found = await Likes.findOne({
    where: { PostId: PostId, UserId: UserId }, // sudah ada like dari user
  });
  if (!found) {
    await Likes.create({ PostId: PostId, UserId: UserId });
    res.json({ liked: true });
  } else {
    await Likes.destroy({ where: { PostId: PostId, UserId: UserId } });
    res.json({ liked: false });
  }
});

module.exports = router;
