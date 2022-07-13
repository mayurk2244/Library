const Book = require("../models/booksModel");

exports.get = async (req, res, next) => {
  try {
    let { title, page, size } = req.query;
    const defaultPage = 1;
    const defaultSize = 5;
    let finalSize = size || defaultSize;
    let finalPage = page || defaultPage;
    let nameSearch = {};
    if (title) {
      nameSearch = { title: { $regex: new RegExp(title, "i") } };
    }
    const count = await Book.countDocuments();
    finalSize > count ? (finalSize = count) : "";
    const booksDetail = await Book.find(nameSearch)
      .select("isbn title author -_id")
      .limit(finalSize * 1)
      .skip((finalPage - 1) * finalSize);
    const result = {
      total: count,
      page: finalPage,
      size: finalSize,
      data: [...booksDetail],
    };
    res.json(result);
  } catch (error) {
    next(error);
  }
};
