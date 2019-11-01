const mongoose = require("mongoose");
const teaNormalizer = require("../../normalizers/teaNormalizer");

// Load input validation
const validateTeaInput = require("../../validation/teas");

// Load Tea model
const Tea = require("../../models/Tea");

module.exports = {
  postTea: (req, res) => {
    const { errors, isValid } = validateTeaInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    Tea.findOne({ id: req.params.teaID }).then(tea => {
      if (tea) {
        return res.status(409).json({ duplicate: "This tea already exists" });
      }

      const newTea = new Tea({
        id: new mongoose.mongo.ObjectId(),
        userID: req.body.userID,
        name: req.body.name,
        brand: req.body.brand,
        teaType: req.body.teaType,
        servings: req.body.servings,
        rating: req.body.rating
      });

      newTea.save().then(tea => res.status(200).json(teaNormalizer(tea)));
    });
  },

  patchTea: (req, res) => {
    const { errors, isValid } = validateTeaInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    Tea.findOneAndUpdate(
      { id: req.body.id },
      req.body,
      { new: true },
      (err, tea) => {
        if (err) return res.send(500, { error: err });
        return res.status(200).json(teaNormalizer(tea));
      }
    );
  },

  deleteTea: (req, res) => {
    Tea.findOneAndDelete({ id: req.params.teaID }, {}, err => {
      if (err) return res.status(500).send(err);
      const response = {
        message: "Tea successfully deleted",
        id: req.body.id
      };
      return res.status(200).send(response);
    });
  },

  getTea: (req, res) => {
    Tea.findOne({ id: req.params.teaID }, (err, tea) => {
      if (err) return res.status(404).send(err);

      if (tea) {
        return res.status(200).json(teaNormalizer(tea));
      } else {
        return res.status(404).json({ teaMissing: "Tea does not exist." });
      }
    });
  },

  getTeas: (req, res) => {
    console.log(req.params);
    Tea.find({ userID: req.params.userID }, (err, teas) => {
      if (err) return res.status(404).send(err);

      if (teas) {
        return res.status(200).send(teas.map(teaNormalizer));
      } else {
        return res.status(404).json({ teasMissing: "Teas do not exist." });
      }
    });
  }
};
