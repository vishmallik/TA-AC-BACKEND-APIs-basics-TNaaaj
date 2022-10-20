const express = require("express");
const router = express.Router();
const State = require("../models/state");

//for a particular state, list all neighbouring states
router.get("/:stateId/neighbours", (req, res, next) => {
  let stateId = req.params.stateId;
  State.findById(stateId)
    .populate("neighbouring_states")
    .exec((err, state) => {
      if (err) return res.status(500).json(err);
      let neighbourList = [];
      state.neighbouring_states.forEach((neighbour) => {
        neighbourList.push(neighbour);
      });
      return res.json({ neighbourList });
    });
});
module.exports = router;
