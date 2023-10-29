const express = require("express");
const { Posts, Likes } = require("../models");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");

// method GET untuk menampilkan seluruh Posts
router.get("/", validateToken, async (req, res) => {
  // SELECT * FROM posts JOIN likes ON
  const allPosts = await Posts.findAll({ include: [Likes] });
  const likedPost = await Likes.findAll({ where: { UserId: req.user.id } }); // post yg sudah ada like
  res.json({ allPosts: allPosts, likedPost: likedPost });
});

// method GET by primary key
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id); // SELECT * FROM posts WHERE id = ?
  res.json(post);
});

// method GET menampilkan post milik userId yang mana
router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const allPostsByUserId = await Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  res.json(allPostsByUserId);
});

// method POST
router.post("/", validateToken, async (req, res) => {
  const post = req.body; // body = isian yang diberikan dari form
  post.username = req.user.username; // username yang membuat post baru
  post.UserId = req.user.id; // UserId yang membuat post baru
  await Posts.create(post); // INSERT INTO posts
  console.log("INFO: " + res.statusCode);
  res.json(post);
});

// method DELETE
router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({ where: { id: postId } });
  res.json("Delete post is success!");
});


// METHOD UPDATE POST
router.put("/title", validateToken, async (req, res) => {
  const post = req.body;
  const title = post.newTitle;
  const postId = post.id;
  await Posts.update({title:title}, {where: {id: postId}})
  res.json(post)
})

router.put("/postText", validateToken, async (req, res) => {
  const post = req.body;
  const text = post.newText;
  const postId = post.id;
  await Posts.update({postText:text}, {where: {id: postId}})
  res.json(post)
})

module.exports = router;
