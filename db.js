const mongoose = require("mongoose");
//above one is importing

//by default node use commonjs but in react it use es6 where we can specify import.... export...

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("unable to connect to db", error.message);
    //the below line is to know why i'm not able to connect to my db.
    console.error(error);
  }
};
module.exports = connectDB;
//exporting
