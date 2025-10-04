const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/mongo.config");

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("Welcome Home");
});

connectDb();

app.listen(PORT, () => {
  console.log(`Server started running at http://localhost:${PORT}`);
});
