const express = require("express");
const router = express.Router();
const Country = require("../models/country");
const State = require("../models/state");

//All countries in ascending order
router.get("/ascending", (req, res, next) => {
  Country.find({})
    .sort({ name: 1 })
    .exec((err, countries) => {
      if (err) return res.status(500).json(err);
      return res.json({ countries });
    });
});

//All countries in descending order
router.get("/descending", (req, res, next) => {
  Country.find({})
    .sort({ name: -1 })
    .exec((err, countries) => {
      if (err) return res.status(500).json(err);
      return res.json({ countries });
    });
});

//list all religions present in entire country dataset.
router.get("/ethnicity", (req, res, next) => {
  Country.aggregate([
    {
      $group: {
        _id: "$ethnicity",
      },
    },
  ]).exec((err, ethnicities) => {
    if (err) return res.status(500).json(err);
    return res.json({ ethnicities });
  });
});

// list countries based on religions.
router.get("/ethnicity/:ethnicityName", (req, res, next) => {
  let ethnicityName = req.params.ethnicityName;
  Country.find({ ethnicity: ethnicityName }, (err, countries) => {
    if (err) return res.status(500).json(err);
    return res.json({ countries });
  });
});

//list countries based on continent.
router.get("/continent/:continentName", (req, res, next) => {
  let continentName = req.params.continentName;
  Country.find({ continent: continentName }, (err, countries) => {
    if (err) return res.status(500).json(err);
    return res.json({ countries });
  });
});

//list countries based on population.
router.get("/population", (req, res, next) => {
  Country.find({})
    .sort({ population: 1 })
    .exec((err, countries) => {
      if (err) return res.status(500).json(err);
      return res.json({ countries });
    });
});

//Edit a country
router.put("/:countryId", (req, res, next) => {
  let countryId = req.params.countryId;
  Country.findByIdAndUpdate(countryId, res.body, (err, country) => {
    if (err) return res.status(500).json(err);
    return res.json({ country });
  });
});

//Delete a country
router.delete("/:countryId", (req, res, next) => {
  let countryId = req.params.countryId;
  Country.findByIdAndRemove(countryId, (err, country) => {
    if (err) return res.status(500).json(err);
    return res.json({ country });
  });
});

//All states list for a country in ascending order
router.get("/:countryId/states/ascending", (req, res, next) => {
  let countryId = req.params.countryId;
  State.find({ country: countryId })
    .sort({ name: 1 })
    .exec((err, state) => {
      if (err) return res.status(500).json(err);
      return res.json({ state });
    });
});

//All states list for a country in descending order
router.get("/:countryId/states/descending", (req, res, next) => {
  let countryId = req.params.countryId;
  State.find({ country: countryId })
    .sort({ name: -1 })
    .exec((err, state) => {
      if (err) return res.status(500).json(err);
      return res.json({ state });
    });
});

//All states list for a country in ascending order of their population
router.get("/:countryId/states/ascending/population", (req, res, next) => {
  let countryId = req.params.countryId;
  State.find({ country: countryId })
    .sort({ population: 1 })
    .exec((err, state) => {
      if (err) return res.status(500).json(err);
      return res.json({ state });
    });
});

// for a particular country, list all neighbouring countires
router.get("/:countryId/neighbours", (req, res, next) => {
  let countryId = req.params.countryId;
  Country.findById(countryId)
    .populate("neighbouring_countries")
    .exec((err, country) => {
      if (err) return res.status(500).json(err);
      let neighbourList = [];
      country.neighbouring_countries.forEach((neighbour) => {
        neighbourList.push(neighbour);
      });
      return res.json({ neighbourList });
    });
});

//update a state from any country
router.put("/:countryId/states/:stateId", (req, res, next) => {
  let countryId = req.params.countryId;
  let stateId = req.params.stateId;
  Country.findByIdAndUpdate(
    countryId,
    { $push: { state: stateId } },
    (err, country) => {
      if (err) return res.status(500).json(err);
      return res.json({ country });
    }
  );
});

//update a state from any country
router.delete("/:countryId/states/:stateId", (req, res, next) => {
  let countryId = req.params.countryId;
  let stateId = req.params.stateId;
  Country.findByIdAndUpdate(
    countryId,
    { $pull: { state: stateId } },
    (err, country) => {
      if (err) return res.status(500).json(err);
      return res.json({ country });
    }
  );
});
module.exports = router;
