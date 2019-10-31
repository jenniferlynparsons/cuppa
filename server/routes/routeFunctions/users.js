const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const User = require("../../models/User");

module.exports = {
  registerUser: (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(409).json({ duplicateEmail: "Email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
              const payload = {
                id: user.id,
                name: user.name
              };

              jwt.sign(
                payload,
                "secret",
                { expiresIn: 31556926 },
                (err, token) => {
                  res.status(200).json({
                    success: true,
                    token: "Bearer " + token
                  });
                }
              );
            });
          });
        });
      }
    });
  },
  loginUser: (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
      if (!user) res.status(404).send({ emailNotFound: "Email not found" });

      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name
          };

          jwt.sign(payload, "secret", { expiresIn: 31556926 }, (err, token) => {
            res.status(200).json({
              success: true,
              token: "Bearer " + token
            });
          });
        } else {
          return res
            .status(400)
            .send({ passwordInCorrect: "Password incorrect" });
        }
      });
    });
  },

  getUser: (req, res) => {
    res.status(200).json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
};
