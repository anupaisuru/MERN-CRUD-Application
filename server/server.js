const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser"); //this is use for covert json format to js object format
const app = express();
const cors = require("cors"); //this is use for transfer data between browsers and servers
app.use(cors());

//app middleware
app.use(bodyParser.json());

//import routes
const userRoutes = require("./routes/userRoutes");

//routes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT;
const DB_URL = process.env.MONGODB_URI;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(("DB connection error", err));
  });

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
