const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comments");
const userRoute = require("./routes/user");
const validateJWT = require("./util/authMiddleware");

dotenv.config();
connectDB();
const app = express();

//we need to give ability to read incoming json...

app.use(express.json());
app.use("/akash/posts", validateJWT, postRoute);
app.use("/akash/comments", commentRoute);
app.use("/akash/user", userRoute);

const PORT = process.env.port || 5000;

app.listen(PORT, () => {
  console.log("Server is running");
});
