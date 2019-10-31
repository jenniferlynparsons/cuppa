const mongoose = require("mongoose");
const teaTypeNormalizer = require("../../normalizers/teaTypeNormalizer");
const validateTeaTypeInput = require("../../validation/teaTypes");
const TeaType = require("../../models/TeaType");

module.exports = {
  postTeaType: (req, res) => {
    const { errors, isValid } = validateTeaTypeInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    TeaType.findOne({ name: req.body.name }).then(teaType => {
      if (teaType) {
        return res
          .status(409)
          .json({ duplicate: "This tea type already exists" });
      }

      const newTeaType = new TeaType({
        id: new mongoose.mongo.ObjectId(),
        userID: req.body.userID,
        name: req.body.name,
        brewTime: req.body.brewTime
      });

      newTeaType.save().then(teaType => {
        res.status(200).json(teaTypeNormalizer(teaType));
      });
    });
  },

  patchTeaType: (req, res) => {
    const { errors, isValid } = validateTeaTypeInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    TeaType.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true },
      function(err, teaType) {
        if (err) return res.send(500, { error: err });
        return res.status(200).json(teaTypeNormalizer(teaType));
      }
    );
  },

  deleteTeaType: (req, res) => {
    TeaType.findOneAndDelete({ id: req.params.id }, {}, err => {
      if (err) return res.status(500).send(err);
      const response = {
        message: "Tea Type successfully deleted",
        id: req.body.id
      };
      return res.status(200).send(response);
    });
  },

  getTeaType: (req, res) => {
    TeaType.findOne({ id: req.params.id }, (err, teaType) => {
      if (err) return res.status(404).send(err);

      if (teaType) {
        return res.status(200).json(teaTypeNormalizer(teaType));
      } else {
        return res
          .status(404)
          .json({ teaTypeMissing: "TeaType does not exist." });
      }
    });
  },
  getTeaTypes: (req, res) => {
    TeaType.find({ userID: req.query.userID }, function(err, teaTypes) {
      if (err) return res.status(404).send(err);

      if (teaTypes) {
        return res.status(200).send(teaTypes.map(teaTypeNormalizer));
      } else {
        return res
          .status(404)
          .json({ teaTypesMissing: "TeaTypes do not exist." });
      }
    });
  }
};
