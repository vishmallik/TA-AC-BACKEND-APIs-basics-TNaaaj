const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

//edit a comment
router.put("/:commentId", (req, res, next) => {
  let commentId = req.params.commentId;
  Comment.findByIdAndUpdate(commentId, req.body, (err, comment) => {
    if (err) return res.status(500).json(err);
    return res.json({ comment });
  });
});

//delete a comment
router.delete("/:commentId", (req, res, next) => {
  let commentId = req.params.commentId;
  Comment.findByIdAndRemove(commentId, (err, comment) => {
    if (err) return res.status(500).json(err);
    return res.json({ comment });
  });
});

module.exports = router;
