const express = require("express");
const router = express.Router({ mergeParams: true });
const servingStyleServices = require("../routeFunctions/servingStyles");

// @route POST api/servingStyles
// @desc Add new tea type
// @access Public
router.post("/", servingStyleServices.postServingStyle);

// @route PUT api/servingStyles
// @desc Edit tea type
// @access Public
router.patch("/:id", servingStyleServices.patchServingStyle);

// @route DELETE api/servingStyles
// @desc Delete tea type
// @access Public
router.delete("/:id", servingStyleServices.deleteServingStyle);

// @route GET api/servingStyles/:id
// @desc Get individual tea type
// @access Public
router.get("/:id", servingStyleServices.getServingStyle);

// @route GET api/servingStyles/:id
// @desc Get all tea types
// @access Public
router.get("/", servingStyleServices.getServingStyles);

module.exports = router;
