const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const teaNormalizer = require("../../normalizers/teaNormalizer");

// Load input validation
const validateTeaInput = require("../../validation/teas");

// Load Tea model
const Tea = require("../../models/Tea");

// @route POST api/teas
// @desc Add new tea
// @access Public
router.post("/", (req, res) => {
  const { errors, isValid } = validateTeaInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Tea.findOne({ id: req.body.id }).then(tea => {
    if (tea) {
      return res.status(409).json({ duplicate: "This tea already exists" });
    }

    const newTea = new Tea({
      id: new mongoose.mongo.ObjectId(),
      userID: req.body.userID,
      name: req.body.name,
      brand: req.body.brand,
      teaType: req.body.teaType,
      servings: req.body.servings
    });

    newTea
      .save()
      .then(tea => res.status(200).json(teaNormalizer(tea)))
      .catch(err => res.status(500, { error: err }));
  });
});

// @route PUT api/teas
// @desc Update tea
// @access Public
router.put("/:id", (req, res) => {
  const { errors, isValid } = validateTeaInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Tea.findOneAndUpdate({ id: req.body.id }, req.body, { new: true }, function(
    err,
    tea
  ) {
    if (err) return res.send(500, { error: err });
    return res.status(200).json(teaNormalizer(tea));
  });
});

// @route DELETE api/teas/:id
// @desc Delete tea
// @access Public
router.delete("/:id", (req, res) => {
  // The "tea" in this callback function represents the document that was found.
  // It allows you to pass a reference back to the client in case they need a reference for some reason.
  Tea.findOneAndDelete({ id: req.params.id }, {}, err => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
      message: "Tea successfully deleted",
      id: req.body.id
    };
    return res.status(200).send(response);
  });
});

// @route GET api/teas/:id
// @desc Get individual tea
// @access Public
router.get("/:id", (req, res) => {
  Tea.findOne({ id: req.params.id }, (err, tea) => {
    if (err) {
      return res.status(404).send(err);
    }
    if (tea) {
      return res.status(200).json(teaNormalizer(tea));
    } else {
      return res.status(404).json({ teaMissing: "Tea does not exist." });
    }
  });
});

// @route GET api/teas
// @desc Get all teas
// @access Public
router.get("/", function(req, res) {
  Tea.find({ userID: req.query.userID }, function(err, teas) {
    if (err) {
      return res.status(404).send(err);
    }
    if (teas) {
      return res.status(200).send(teas.map(teaNormalizer));
    } else {
      return res.status(404).json({ teasMissing: "Teas do not exist." });
    }
  });
});

module.exports = router;
