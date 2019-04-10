const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TeaSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String
  },
  teaType: {
    type: String
  },
  servings: {
    type: Number
  }
});

module.exports = Tea = mongoose.model("teas", TeaSchema);
