const mongoose = require("mongoose");
const brandNormalizer = require("../../normalizers/brandNormalizer");
const validatebrandInput = require("../../validation/brands");
const Brand = require("../../models/Brand");

module.exports = {
  postBrand: (req, res) => {
    console.log(req.body);
    const { errors, isValid } = validatebrandInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    Brand.findOne({ name: req.body.name }).then(brand => {
      if (brand) {
        return res
          .status(409)
          .json({ duplicate: "This tea type already exists" });
      }

      const newbrand = new Brand({
        id: new mongoose.mongo.ObjectId(),
        userID: req.body.userID,
        globalID: req.body.globalID,
        name: req.body.name,
        visible: req.body.visible
      });

      newbrand.save().then(brand => {
        res.status(200).json(brandNormalizer(brand));
      });
    });
  },

  patchBrand: (req, res) => {
    const { errors, isValid } = validatebrandInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    Brand.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true },
      function(err, brand) {
        if (err) return res.send(500, { error: err });
        return res.status(200).json(brandNormalizer(brand));
      }
    );
  },

  deleteBrand: (req, res) => {
    Brand.findOneAndRemove({ id: req.params.id }, {}, err => {
      if (err) return res.status(500).send(err);
      const response = {
        message: "Tea Type successfully deleted",
        id: req.body.id
      };
      return res.status(200).send(response);
    });
  },

  getBrand: (req, res) => {
    Brand.findOne({ id: req.params.id }, (err, brand) => {
      if (err) return res.status(404).send(err);

      if (brand) {
        return res.status(200).json(brandNormalizer(brand));
      } else {
        return res.status(404).json({ brandMissing: "brand does not exist." });
      }
    });
  },
  getBrands: (req, res) => {
    const userID = req.params.userID ? req.params.userID : req.query.userID;

    Brand.find({ userID: userID }, function(err, brands) {
      if (err) return res.status(404).send(err);

      if (brands) {
        return res.status(200).send(brands.map(brandNormalizer));
      } else {
        return res.status(404).json({ brandsMissing: "brands do not exist." });
      }
    });
  }
};
