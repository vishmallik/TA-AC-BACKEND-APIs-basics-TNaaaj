const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const Category = require("../model/category");

//create a category
router.post("/", (req, res, next) => {
  Category.create(req.body, (err, category) => {
    if (err) return res.status(500).json(err);
    return res.json({ category });
  });
});

//edit a category
router.put("/:categoryId", (req, res, next) => {
  let catgoryId = req.params.catgoryId;
  Category.findByIdAndUpdate(catgoryId, req.body, (err, category) => {
    if (err) return res.status(500).json(err);
    return res.json({ category });
  });
});

//delete a category
router.delete("/:categoryId", (req, res, next) => {
  let categoryId = req.params.categoryId;
  Category.findByIdAndRemove(categoryId, (err, category) => {
    if (err) return res.status(500).json(err);
    return res.json({ category });
  });
});

//list all cotaegories
router.get("/", (req, res, next) => {
  Category.find({}, (err, categories) => {
    if (err) return res.status(500).json(err);
    return res.json({ categories });
  });
});

module.exports = router;
