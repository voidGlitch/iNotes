const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// Create a user using : POST "/api/auth/" .Doesn't require Auth
router.post(
  "/",
  [
    // username must be an email
    body("email", "Enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password must be more than 5 characters").isLength({
      min: 5,
    }),
    body("name", "Enter a valid name").isLength({ min: 3 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.json({
          error: "Please enter a unique value for email",
          message: err.message,
        });
      });
  }
);
module.exports = router;
