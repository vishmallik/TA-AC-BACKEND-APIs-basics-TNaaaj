const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: { type: String, required: true },
    author: String,
    likes: { type: Number, default: 0 },
    bookId: { type: Schema.Types.ObjectId, ref: "Book" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
