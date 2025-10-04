const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log("MongoDB connection error ", error);
  }
};

mongoose.connection.on("connected", () => {
  console.log("Database Connected");
});
mongoose.connection.on("disconnected", () => {
  console.log("Database disconnected");
});
mongoose.connection.on("error", (err) => {
  console.error("Database connection error", err);
});

module.exports = connectDb;
