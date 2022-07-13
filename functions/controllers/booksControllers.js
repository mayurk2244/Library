const Book = require("../models/booksModel");

exports.get = async (req, res, next) => {
  try {
    let { title, page, size } = req.query;
    let nameSearch = {};
    const count = await Book.countDocuments();
    const booksDetail = await Book.find(nameSearch)
      .select("isbn title author -_id")
      .limit(size * 1)
      .skip((page - 1) * size);
    const result = {
      total: count,
      page,
      size,
      data: [...booksDetail],
    };
    res.json(result);
  } catch (error) {
    next(error);
  }
};
