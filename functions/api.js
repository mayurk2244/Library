require("dotenv").config();
const express = require("express");
const app = express();
const bookRoutes = require("./routes/bookRoutes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const cors = require("cors");
const router = express.Router();


mongoose
  .connect(process.env.DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB connection Successfully!");
  });


router.get("/", (req, res) => {
  res.send("Server Started");
});

app.use(bodyParser.json());
app.use(cors());
app.use("/.netlify/functions/api/books", bookRoutes);
app.use("/.netlify/functions/api", router);
app.use(function (req, res) {
  res.status(404).json({
    message: "URL Not Found.",
  });
});




module.exports = app;
module.exports.handler = serverless(app);
