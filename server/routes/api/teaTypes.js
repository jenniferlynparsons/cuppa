const express = require("express");
const router = express.Router();
const teaTypeServices = require("../routeFunctions/teaTypes");

// @route POST api/teaTypes
// @desc Add new tea type
// @access Public
router.post("/", teaTypeServices.postTeaType);

// @route PUT api/teaTypes
// @desc Edit tea type
// @access Public
router.patch("/:id", teaTypeServices.patchTeaType);

// @route DELETE api/teaTypes
// @desc Delete tea type
// @access Public
router.delete("/:id", teaTypeServices.deleteTeaType);

// @route GET api/teaTypes/:id
// @desc Get individual tea type
// @access Public
router.get("/:id", teaTypeServices.getTeaType);

// @route GET api/teaTypes/:id
// @desc Get all tea types
// @access Public
router.get("/", teaTypeServices.getTeaTypes);

module.exports = router;
