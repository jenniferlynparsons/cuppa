const express = require("express");
const router = express.Router();
const passport = require("passport");
const userServices = require("../routeFunctions/users");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", userServices.registerUser);

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", userServices.loginUser);

// @route GET api/users/currentuser
// @desc Return current user
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  userServices.getUser
);

module.exports = router;
