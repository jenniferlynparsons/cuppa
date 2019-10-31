const express = require("express");
const router = express.Router();
const teaServices = require("../routeFunctions/teas");

// @route POST api/teas
// @desc Add new tea
// @access Public
router.post("/", teaServices.postTea);

// @route PUT api/teas
// @desc Update tea
// @access Public
router.patch("/:id", teaServices.patchTea);

// @route DELETE api/teas/:id
// @desc Delete tea
// @access Public
router.delete("/:id", teaServices.deleteTea);

// @route GET api/teas/:id
// @desc Get individual tea
// @access Public
router.get("/:id", teaServices.getTea);

// @route GET api/teas
// @desc Get all teas
// @access Public
router.get("/", teaServices.getTeas);

module.exports = router;
