require("dotenv").config();
const express = require("express");
const app = express();
const bookRoutes = require("./routes/bookRoutes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB connection Successfully!");
  });

app.use(bodyParser.json());

app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("Server Started");
});

app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});

module.exports = app;
