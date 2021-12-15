const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// Create a user using : POST "/api/auth/createUser" .No login require Auth
router.post(
  "/createUser",
  [
    // username must be an email
    body("email", "Enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password must be more than 5 characters").isLength({
      min: 5,
    }),
    body("name", "Enter a valid name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    //if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //CHECK WHEATHER the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res
          .status(400)
          .json({ error: "sorry a user with this email already exists" });
      }
      //create a new USER
      user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });
      // .then((user) => res.json(user))
      // .catch((err) => {
      //   console.log(err);
      //   res.json({
      //     error: "Please enter a unique value for email",
      //     message: err.message,
      //   });
      // });
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);
module.exports = router;
