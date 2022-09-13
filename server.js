const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const AuthRouter = require("./routes/auth.route");

const PORT = Number(process.env.PORT);

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use("/api/auth", AuthRouter);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
    serverSelectionTimeoutMS: Number(process.env.MONGODB_TIMEOUT),
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
