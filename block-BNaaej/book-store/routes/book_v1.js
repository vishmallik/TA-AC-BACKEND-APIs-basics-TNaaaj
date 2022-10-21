const express = require("express");
const Book = require("../models/book");
const router = express.Router();

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

module.exports = router;
