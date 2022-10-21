const express = require("express");
const Book = require("../models/book");
const router = express.Router();
const Comment = require("../models/comment");

//Get all books
router.get("/", (req, res, next) => {
  Book.find({}, (err, bookList) => {
    if (err) return res.status(500).json(err);
    return res.json({ bookList });
  });
});

//create a book
router.post("/", (req, res, next) => {
  Book.create(req.body, (err, book) => {
    if (err) return res.status(500).json(err);
    return res.json({ book });
  });
});

//get single book
router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  Book.findById(id, (err, book) => {
    if (err) return res.status(500).json(err);
    return res.json({ book });
  });
});

//update a book
router.put("/:id", (req, res, next) => {
  let id = req.params.id;
  Book.findByIdAndUpdate(id, req.body, (err, book) => {
    if (err) return res.status(500).json(err);
    return res.json({ book });
  });
});

//delete a book
router.delete("/:id", (req, res, next) => {
  let id = req.params.id;
  Book.findByIdAndRemove(id, (err, book) => {
    if (err) return res.status(500).json(err);
    return res.json({ book });
  });
});

//view all comments for a specific book
router.get("/:id/comments", (req, res, next) => {
  let id = req.params.id;
  Comment.find({ bookId: id }, (err, comments) => {
    if (err) return res.status(500).json(err);
    return res.json({ comments });
  });
});

//add comment
router.post("/comments", (req, res, next) => {
  Comment.create(req.body, (err, comment) => {
    if (err) return res.status(500).json(err);
    return res.json({ comment });
  });
});

//list books by category
router.get("category/:category", (req, res, next) => {
  let category = req.params.category;
  Book.find({ category }, (err, bookList) => {
    if (err) return res.status(500).json(err);
    return res.json({ bookList });
  });
});

//count books for each category
router.get("/category/count", (req, res, next) => {
  Book.aggregate([
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
  ]).exec((err, booksCount) => {
    if (err) return res.status(500).json(err);
    return res.json({ booksCount });
  });
});

//list book by author
router.get("/author/:authorName", (req, res, next) => {
  let author = req.params.authorName;
  Book.find({ author }, (err, bookList) => {
    if (err) return res.status(500).json(err);
    return res.json({ bookList });
  });
});

//find all tags
router.get("/tags", (req, res, next) => {
  Book.aggregate([
    {
      $unwind: "$tag",
    },
    {
      $group: {
        _id: "$tags",
      },
    },
  ]).exec((err, tags) => {
    if (err) return res.status(500).json(err);
    return res.json({ tags });
  });
});

// list tags in ascending order
router.get("/tags/ascending", (req, res, next) => {
  Book.aggregate([
    {
      $unwind: "$tag",
    },
    {
      $group: {
        _id: "$tags",
      },
    },
    {
      $sort: 1,
    },
  ]).exec((err, tags) => {
    if (err) return res.status(500).json(err);
    return res.json({ tags });
  });
});

// list tags in descending order
router.get("/tags/descending", (req, res, next) => {
  Book.aggregate([
    {
      $unwind: "$tag",
    },
    {
      $group: {
        _id: "$tags",
      },
    },
    {
      $sort: -1,
    },
  ]).exec((err, tags) => {
    if (err) return res.status(500).json(err);
    return res.json({ tags });
  });
});

// filter book by tags
router.get("/tag/:tagName", (req, res, next) => {
  let tagName = req.params.tagName;
  Book.find({ tags: tagName }, (err, bookList) => {
    if (err) return res.status(500).json(err);
    return res.json({ bookList });
  });
});

//count books for each tag
router.get("/tags/count", (req, res, next) => {
  Book.aggregate([
    {
      $unwind: "$tag",
    },
    {
      $group: {
        _id: "$tags",
        count: { $sum: 1 },
      },
    },
  ]).exec((err, booksCount) => {
    if (err) return res.status(500).json(err);
    return res.json({ booksCount });
  });
});

module.exports = router;
