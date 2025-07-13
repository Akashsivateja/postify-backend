const express = require("express");
const Post = require("../models/post");

const router = express.Router();

router.get("/sayhello", async (req, res) => {
  res.status(200).json("hello");
});

router.post("/addPost", async (req, res) => {
  const { title, content, createdBy } = req.body;
  try {
    const newPost = new Post({ title, content, createdBy });
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    console.error("Save Error:", error.message);
    res.status(500).json("Unable to Save!");
  }
});

router.get("/allPosts", async (req, res) => {
  try {
    const allPosts = await Post.find().populate("comments");
    res.status(200).json(allPosts);
  } catch (error) {
    console.error("Message:", error.message);
    res.status(500).json("Unable to get Posts!");
  }
});
module.exports = router;
