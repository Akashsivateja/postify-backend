const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Types.ObjectId, ref: "Post", required: true },
  content: { type: String, required: true },
  createdBy: { type: String, required: true },
  //createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Comment", commentSchema);
