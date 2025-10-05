const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/mongo.config");
const authRouter = require("./routes/auth.route");
const blogRouter = require("./routes/blog.route");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("Welcome to Legacy BLog API");
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/api/users/auth", authRouter);
app.use("/api/blogs", blogRouter);

connectDb();

app.listen(PORT, () => {
  console.log(`Server started running at http://localhost:${PORT}`);
});
