const express = require("express");
const router = express.Router({ mergeParams: true });
const purchaseLocationServices = require("../routeFunctions/purchaseLocations");

// @route POST api/purchaseLocations
// @desc Add new tea type
// @access Public
router.post("/", purchaseLocationServices.postPurchaseLocation);

// @route PUT api/purchaseLocations
// @desc Edit tea type
// @access Public
router.patch("/:id", purchaseLocationServices.patchPurchaseLocation);

// @route DELETE api/purchaseLocations
// @desc Delete tea type
// @access Public
router.delete("/:id", purchaseLocationServices.deletePurchaseLocation);

// @route GET api/purchaseLocations/:id
// @desc Get individual tea type
// @access Public
router.get("/:id", purchaseLocationServices.getPurchaseLocation);

// @route GET api/purchaseLocations/:id
// @desc Get all tea types
// @access Public
router.get("/", purchaseLocationServices.getPurchaseLocations);

module.exports = router;
