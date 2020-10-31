const mongoose = require("mongoose");
const servingStyleNormalizer = require("../../normalizers/servingStyleNormalizer");
const validateServingStyleInput = require("../../validation/servingStyles");
const ServingStyle = require("../../models/ServingStyle");

module.exports = {
  postServingStyle: (req, res) => {
    console.log(req.body);
    const { errors, isValid } = validateServingStyleInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    ServingStyle.findOne({ name: req.body.name }).then(servingStyle => {
      if (servingStyle) {
        return res
          .status(409)
          .json({ duplicate: "This tea type already exists" });
      }

      const newServingStyle = new ServingStyle({
        id: new mongoose.mongo.ObjectId(),
        userID: req.body.userID,
        globalID: req.body.globalID,
        name: req.body.name,
        visible: req.body.visible
      });

      newServingStyle.save().then(servingStyle => {
        res.status(200).json(servingStyleNormalizer(servingStyle));
      });
    });
  },

  patchServingStyle: (req, res) => {
    const { errors, isValid } = validateServingStyleInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    ServingStyle.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true },
      function(err, servingStyle) {
        if (err) return res.send(500, { error: err });
        return res.status(200).json(servingStyleNormalizer(servingStyle));
      }
    );
  },

  deleteServingStyle: (req, res) => {
    ServingStyle.findOneAndRemove({ id: req.params.id }, {}, err => {
      if (err) return res.status(500).send(err);
      const response = {
        message: "Tea Type successfully deleted",
        id: req.body.id
      };
      return res.status(200).send(response);
    });
  },

  getServingStyle: (req, res) => {
    ServingStyle.findOne({ id: req.params.id }, (err, servingStyle) => {
      if (err) return res.status(404).send(err);

      if (servingStyle) {
        return res.status(200).json(servingStyleNormalizer(servingStyle));
      } else {
        return res
          .status(404)
          .json({ servingStyleMissing: "ServingStyle does not exist." });
      }
    });
  },
  getServingStyles: (req, res) => {
    const userID = req.params.userID ? req.params.userID : req.query.userID;

    ServingStyle.find({ userID: userID }, function(err, servingStyles) {
      if (err) return res.status(404).send(err);

      if (servingStyles) {
        return res.status(200).send(servingStyles.map(servingStyleNormalizer));
      } else {
        return res
          .status(404)
          .json({ servingStylesMissing: "ServingStyles do not exist." });
      }
    });
  }
};
