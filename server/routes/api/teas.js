const express = require("express");
const router = express.Router();

// Load Tea model
const Tea = require("../../models/Tea");

// @route POST api/teas/new-tea
// @desc Add new tea
// @access Public
router.post("/new-tea", (req, res) => {
  // TODO Form validation

  // const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  Tea.findOne({ id: req.body.id }).then(tea => {
    if (tea) {
      return res.status(400).json({ id: "This tea already exists" });
    }

    const newTea = new Tea({
      id: req.body.id,
      userID: req.body.userID,
      name: req.body.name,
      brand: req.body.brand,
      teaType: req.body.teaType,
      servings: req.body.servings
    });

    newTea
      .save()
      .then(tea => res.json(tea))
      .catch(err => console.log(err));

  });
});


router.put("/update-tea", (req, res) => {

  Tea.findOneAndUpdate({id: req.body.id}, req.body, {new: true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.json(doc);
  });

})

router.delete("/delete-tea", (req, res) => {
  // The "tea" in this callback function represents the document that was found.
  // It allows you to pass a reference back to the client in case they need a reference for some reason.
  Tea.findOneAndDelete({id: req.body.id},{}, (err, todo) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
        message: "Tea successfully deleted",
        id: req.body.id
    };
    return res.status(200).send(response);
  });
});

// get the tea with that id (accessed at GET http://localhost:8080/api/teas/:tea_id)
router.get('/tea', (req, res) => {
  Tea.findOne({id: req.body.id},(err, tea) => {
    if (err){
      res.send(err);
    }
    if(tea){
      res.json(tea);
    }else{
      return res.json({ message: 'Tea does not exist.' });
    }
  });
});



router.post('/teasList', function(req, res) {
  Tea.find({userID: req.body.listOwner}, function(err, teas) {
    var teaMap = [];
    var index = 0
    teas.forEach(function(tea) {
      teaMap[index] = tea;
      index++;
    });

    res.send(teaMap);
  });
});

module.exports = router;