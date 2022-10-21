const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    book: { type: Schema.Types.ObjectId, ref: "Book" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
