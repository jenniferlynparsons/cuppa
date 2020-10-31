const mongoose = require("mongoose");
const purchaseLocationNormalizer = require("../../normalizers/purchaseLocationNormalizer");
const validatePurchaseLocationInput = require("../../validation/purchaseLocations");
const PurchaseLocation = require("../../models/PurchaseLocation");

module.exports = {
  postPurchaseLocation: (req, res) => {
    console.log(req.body);
    const { errors, isValid } = validatePurchaseLocationInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    PurchaseLocation.findOne({ name: req.body.name }).then(purchaseLocation => {
      if (purchaseLocation) {
        return res
          .status(409)
          .json({ duplicate: "This tea type already exists" });
      }

      const newPurchaseLocation = new PurchaseLocation({
        id: new mongoose.mongo.ObjectId(),
        userID: req.body.userID,
        globalID: req.body.globalID,
        name: req.body.name,
        visible: req.body.visible
      });

      newPurchaseLocation.save().then(purchaseLocation => {
        res.status(200).json(purchaseLocationNormalizer(purchaseLocation));
      });
    });
  },

  patchPurchaseLocation: (req, res) => {
    const { errors, isValid } = validatePurchaseLocationInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    PurchaseLocation.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true },
      function(err, purchaseLocation) {
        if (err) return res.send(500, { error: err });
        return res
          .status(200)
          .json(purchaseLocationNormalizer(purchaseLocation));
      }
    );
  },

  deletePurchaseLocation: (req, res) => {
    PurchaseLocation.findOneAndRemove({ id: req.params.id }, {}, err => {
      if (err) return res.status(500).send(err);
      const response = {
        message: "Tea Type successfully deleted",
        id: req.body.id
      };
      return res.status(200).send(response);
    });
  },

  getPurchaseLocation: (req, res) => {
    PurchaseLocation.findOne({ id: req.params.id }, (err, purchaseLocation) => {
      if (err) return res.status(404).send(err);

      if (purchaseLocation) {
        return res
          .status(200)
          .json(purchaseLocationNormalizer(purchaseLocation));
      } else {
        return res.status(404).json({
          purchaseLocationMissing: "purchaseLocation does not exist."
        });
      }
    });
  },
  getPurchaseLocations: (req, res) => {
    const userID = req.params.userID ? req.params.userID : req.query.userID;

    PurchaseLocation.find({ userID: userID }, function(err, purchaseLocations) {
      if (err) return res.status(404).send(err);

      if (purchaseLocations) {
        return res
          .status(200)
          .send(purchaseLocations.map(purchaseLocationNormalizer));
      } else {
        return res.status(404).json({
          purchaseLocationsMissing: "purchaseLocations do not exist."
        });
      }
    });
  }
};
