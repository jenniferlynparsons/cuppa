const express = require("express");
const router = express.Router();
const teaTypeNormalizer = require("../../normalizers/teaTypeNormalizer");

// Load input validation
const validateTeaTypeInput = require("../../validation/teaTypes");

// Load Tea model
const TeaType = require("../../models/TeaType");

// @route POST api/teas/new-tea
// @desc Add new tea
// @access Public
router.post("/new-tea-type", (req, res) => {
  const { errors, isValid } = validateTeaTypeInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  TeaType.findOne({ id: req.body.id }).then(teaType => {
    if (teaType) {
      return res
        .status(400)
        .json({ teaTypeConflict: "This tea type already exists" });
    }

    const newTeaType = new TeaType({
      id: req.body.id,
      userID: req.body.userID,
      name: req.body.name,
      brewTime: req.body.brewTime
    });

    newTeaType
      .save()
      .then(teaType => res.json(teaTypeNormalizer(teaType)))
      .catch(err => console.log(err));
  });
});

router.put("/update-tea-type", (req, res) => {
  const { errors, isValid } = validateTeaTypeInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  TeaType.findOneAndUpdate(
    { id: req.body.id },
    req.body,
    { new: true },
    function(err, teaType) {
      console.log("-------------server response------------");
      console.log(teaType);
      // console.log(res.json());
      if (err) return res.send(500, { error: err });
      return res.json(teaTypeNormalizer(teaType));
    }
  );
});

router.delete("/delete-tea-type/:id", (req, res) => {
  // The "tea" in this callback function represents the document that was found.
  // It allows you to pass a reference back to the client in case they need a reference for some reason.
  TeaType.findOneAndDelete({ id: req.params.id }, {}, err => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
      message: "Tea Type successfully deleted",
      id: req.body.id
    };
    return res.status(200).send(response);
  });
});

// get the teaType with that id (accessed at GET http://localhost:8080/api/teas/:tea_id)
router.get("/tea-type/:id", (req, res) => {
  TeaType.findOne({ id: req.params.id }, (err, tea) => {
    if (err) {
      res.send(err);
    }
    if (tea) {
      res.json(teaTypeNormalizer(tea));
    } else {
      return res.json({ message: "Tea does not exist." });
    }
  });
});

router.get("/teaTypesList/:id", function(req, res) {
  TeaType.find({ userID: req.params.id }, function(err, teaTypes) {
    res.send(teaTypes.map(teaTypeNormalizer));
  });
});

module.exports = router;
