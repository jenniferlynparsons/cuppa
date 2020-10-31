const express = require("express");
const router = express.Router({ mergeParams: true });
const teaServices = require("../routeFunctions/teas");

// @route POST api/teas
// @desc Add new tea
// @access Public
router.post("/", teaServices.postTea);

// @route PUT api/teas
// @desc Update tea
// @access Public
router.patch("/:teaID", teaServices.patchTea);

// @route DELETE api/teas/:teaID
// @desc Delete tea
// @access Public
router.delete("/:teaID", teaServices.deleteTea);

// @route GET api/teas/:teaID
// @desc Get individual tea
// @access Public
router.get("/:teaID", teaServices.getTea);

// @route GET api/teas
// @desc Get all teas
// @access Public
router.get("/", teaServices.getTeas);

module.exports = router;
