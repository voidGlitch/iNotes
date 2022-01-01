const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = "HARRYISAGOODB$OY";

// Route 1 :Create a user using : POST "/api/auth/createUser" .No login require Auth
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
    let success = false;
    //if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //CHECK WHEATHER the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({
          success,
          error: "sorry a user with this email already exists",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);

      //create a new USER
      user = await User.create({
        name: req.body.name,
        password: secpass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });

      // .then((user) => res.json(user))
      // .catch((err) => {
      //   console.log(err);
      //   res.json({
      //     error: "Please enter a unique value for email",
      //     message: err.message,
      //   });
      // });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({
            success,
            error: "Please try to login with correct credentials",
          });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
