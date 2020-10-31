const express = require("express");
const router = express.Router({ mergeParams: true });
const sourceServices = require("../routeFunctions/sources");

// @route POST api/sources
// @desc Add new tea type
// @access Public
router.post("/", sourceServices.postSource);

// @route PUT api/sources
// @desc Edit tea type
// @access Public
router.patch("/:id", sourceServices.patchSource);

// @route DELETE api/sources
// @desc Delete tea type
// @access Public
router.delete("/:id", sourceServices.deleteSource);

// @route GET api/sources/:id
// @desc Get individual tea type
// @access Public
router.get("/:id", sourceServices.getSource);

// @route GET api/sources/:id
// @desc Get all tea types
// @access Public
router.get("/", sourceServices.getSources);

module.exports = router;
