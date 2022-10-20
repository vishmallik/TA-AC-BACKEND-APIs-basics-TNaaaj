const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stateSchema = new Schema(
  {
    name: String,
    country: { type: Schema.Types.ObjectId, ref: "Country" },
    population: { type: Number, default: 0 },
    neighbouring_states: [{ type: Schema.Types.ObjectId, ref: "State" }],
    area: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("State", stateSchema);
