const express = require("express");
const bookRoutes = express.Router();
const booksControllers = require("../controllers/booksControllers");
const Book = require("../models/booksModel");

bookRoutes.get("/", booksControllers.get);

module.exports = bookRoutes;
