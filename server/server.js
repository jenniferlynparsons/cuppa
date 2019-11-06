const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const users = require("./routes/api/users");
const teas = require("./routes/api/teas");
const teaTypes = require("./routes/api/teaTypes");
const servingStyles = require("./routes/api/servingStyles");

const app = express();

app.use(cors());

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = process.env.MONGOURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

app.use(express.static("client/dist"));

// Routes
app.use("/api/users", users);
app.use("/api/teas", teas);
app.use("/api/teaTypes", teaTypes);
app.use("/api/servingStyles", servingStyles);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

// app.use(function(req, res) {
// 	res.sendFile(path.join(__dirname, '../client/dist/index.html'));
// });

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: true,
    data: {
      message: err.message,
      stack: process.env.NODE_ENV !== "production" ? err.stack : undefined
    }
  });
  next(err);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
