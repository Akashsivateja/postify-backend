const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true }, //column1
  content: { type: String, required: true },
  //coverImage: { type: String, required: true },
  //createdBy: { type: String, required: true },
  createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

//When the user wants all the posts after /allPosts we want the comments associated with the
// respective posts, So now we'll establish a virtual connection between Post and Comment.

postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "postId",
});

postSchema.set("toObject", { virtuals: true });
postSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Post", postSchema);
