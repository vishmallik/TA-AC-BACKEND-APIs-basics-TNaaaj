const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countrySchema = new Schema(
  {
    name: String,
    states: [{ type: Schema.Types.ObjectId, ref: "State" }],
    continent: String,
    population: { type: Number, default: 0 },
    ethnicity: [{ type: String }],
    neighbouring_countries: [{ type: Schema.Types.ObjectId, ref: "Country" }],
    area: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Country", countrySchema);
