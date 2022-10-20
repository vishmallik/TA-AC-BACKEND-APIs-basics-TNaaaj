const express = require("express");
const Book = require("../models/book");
const router = express.Router();
const Comment = require("../models/comment");

router.get("/", (req, res, next) => {
  Book.find({}, (err, bookList) => {
    if (err) return res.status(500).json(err);
    return res.json({ bookList });
  });
});

router.post("/", (req, res, next) => {
  Book.create(req.body, (err, book) => {
    if (err) return res.status(500).json(err);
    return res.json({ book });
  });
});

router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  Book.findById(id, (err, book) => {
    if (err) return res.status(500).json(err);
    return res.json({ book });
  });
});

router.put("/:id", (req, res, next) => {
  let id = req.params.id;
  Book.findByIdAndUpdate(id, req.body, (err, book) => {
    if (err) return res.status(500).json(err);
    return res.json({ book });
  });
});

router.delete("/:id", (req, res, next) => {
  let id = req.params.id;
  Book.findByIdAndRemove(id, (err, book) => {
    if (err) return res.status(500).json(err);
    return res.json({ book });
  });
});

router.get("/:id/comments", (req, res, next) => {
  let id = req.params.id;
  Comment.find({ bookId: id }, (err, comments) => {
    if (err) return res.status(500).json(err);
    return res.json({ comments });
  });
});

router.post("/:id/comments", (req, res, next) => {
  let id = req.params.id;
  Comment.create(req.body, (err, comment) => {
    if (err) return res.status(500).json(err);
    return res.json({ comment });
  });
});

router.put("/comments/:commentId", (req, res, next) => {
  let commentId = req.params.commentId;
  Comment.findByIdAndUpdate(commentId, req.body, (err, comment) => {
    if (err) return res.status(500).json(err);
    return res.json({ comment });
  });
});

router.delete("/comments/:commentId", (req, res, next) => {
  let commentId = req.params.commentId;
  Comment.findByIdAndRemove(commentId, (err, comment) => {
    if (err) return res.status(500).json(err);
    return res.json({ comment });
  });
});

module.exports = router;
