const express = require("express");
const router = express.Router({ mergeParams: true });
const brandServices = require("../routeFunctions/brands");

// @route POST api/brands
// @desc Add new tea type
// @access Public
router.post("/", brandServices.postBrand);

// @route PUT api/brands
// @desc Edit tea type
// @access Public
router.patch("/:id", brandServices.patchBrand);

// @route DELETE api/brands
// @desc Delete tea type
// @access Public
router.delete("/:id", brandServices.deleteBrand);

// @route GET api/brands/:id
// @desc Get individual tea type
// @access Public
router.get("/:id", brandServices.getBrand);

// @route GET api/brands/:id
// @desc Get all tea types
// @access Public
router.get("/", brandServices.getBrands);

module.exports = router;
