const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const userServices = require("../routeFunctions/users");
const teas = require("./teas");
const teaTypes = require("./teaTypes");
const servingStyles = require("./servingStyles");
const brands = require("./brands");
const sources = require("./sources");
const purchaseLocations = require("./purchaseLocations");

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

// Tea routes
router.use("/:userID/teas", teas);

// Tea Type routes
router.use("/:userID/teaTypes", teaTypes);

// Serving Style routes
router.use("/:userID/servingStyles", servingStyles);

// Brand routes
router.use("/:userID/brands", brands);

// Source routes
router.use("/:userID/sources", sources);

// Purchase Location routes
router.use("/:userID/purchaseLocations", purchaseLocations);

module.exports = router;
