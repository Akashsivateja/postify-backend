const express = require("express");
const Comment = require("../models/Comment");

const router = express.Router();

router.post("/addComment/:postId", async (req, res) => {
  const postId = req.params.postId;
  const { content, createdBy } = req.body;
  try {
    const newComment = new Comment({ postId, content, createdBy });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json("unable to create");
  }
});

module.exports = router;
