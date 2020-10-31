const mongoose = require("mongoose");
const sourceNormalizer = require("../../normalizers/sourceNormalizer");
const validatesourceInput = require("../../validation/sources");
const Source = require("../../models/Source");

module.exports = {
  postSource: (req, res) => {
    console.log(req.body);
    const { errors, isValid } = validatesourceInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    Source.findOne({ name: req.body.name }).then(source => {
      if (source) {
        return res
          .status(409)
          .json({ duplicate: "This tea type already exists" });
      }

      const newsource = new Source({
        id: new mongoose.mongo.ObjectId(),
        userID: req.body.userID,
        globalID: req.body.globalID,
        name: req.body.name,
        visible: req.body.visible
      });

      newsource.save().then(source => {
        res.status(200).json(sourceNormalizer(source));
      });
    });
  },

  patchSource: (req, res) => {
    const { errors, isValid } = validatesourceInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    Source.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true },
      function(err, source) {
        if (err) return res.send(500, { error: err });
        return res.status(200).json(sourceNormalizer(source));
      }
    );
  },

  deleteSource: (req, res) => {
    Source.findOneAndRemove({ id: req.params.id }, {}, err => {
      if (err) return res.status(500).send(err);
      const response = {
        message: "Tea Type successfully deleted",
        id: req.body.id
      };
      return res.status(200).send(response);
    });
  },

  getSource: (req, res) => {
    Source.findOne({ id: req.params.id }, (err, source) => {
      if (err) return res.status(404).send(err);

      if (source) {
        return res.status(200).json(sourceNormalizer(source));
      } else {
        return res
          .status(404)
          .json({ sourceMissing: "source does not exist." });
      }
    });
  },
  getSources: (req, res) => {
    const userID = req.params.userID ? req.params.userID : req.query.userID;

    Source.find({ userID: userID }, function(err, sources) {
      if (err) return res.status(404).send(err);

      if (sources) {
        return res.status(200).send(sources.map(sourceNormalizer));
      } else {
        return res
          .status(404)
          .json({ sourcesMissing: "sources do not exist." });
      }
    });
  }
};
