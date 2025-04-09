const connectToMongo = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const postRouter = require("./routers/postRouter");

connectToMongo();

const app = express();

app.use(express.json()); // for body parsing..
app.use(cors());
app.use(cookieparser());
app.use(bodyParser.json());

//routes
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", postRouter);

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
