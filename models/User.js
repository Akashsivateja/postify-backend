const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "createdBy"
});

userSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "createdBy"
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", userSchema);
