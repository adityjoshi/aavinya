const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { users } = require("../database");
require("dotenv").config();

let refreshTokens = [];

// Sign up
router.post(
  "/signup",
  [
    check("full_name", "Username is required").not().isEmpty(),
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
    check("contact_number", "Mobile is required").isMobilePhone(),
    check("region", "Region is required").not().isEmpty(),
    check("user_type", "User type is required").not().isEmpty(),
  ],
  async (req, res) => {
    const { full_name,email,password,region,contact_number,user_type } = req.body;

    // Validate user input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // Check if user already exists
    let user = users.find((user) => user.email === email);
    if (user) {
      return res.status(200).json({
        errors: [
          {
            email: user.email,
            msg: "The user already exists",
          },
        ],
      });
    }

    // Hash password and save user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    users.push({
      full_name,
      email,
      password: hashedPassword,
      contact_number,
      region,
      user_type,
    });

    // Return success response
    res.status(201).json({ success: true, message: "Signup successful!" });
  }
);

// Log in
router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    check("region", "Region is required").not().isEmpty(),
  ],
  async (req, res) => {
    const { email, password, region } = req.body;

    // Check if user exists
    let user = users.find((user) => user.email === email);
    if (!user || user.region !== region) {
      return res.status(400).json({ success: false, message: "Invalid credentials." });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Email or password is invalid." });
    }

    // Generate tokens
    const accessToken = await JWT.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1m",
    });
    const refreshToken = await JWT.sign({ email }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "5m",
    });
    refreshTokens.push(refreshToken);

    // Return login success response
    res.status(200).json({ status: "ok", accessToken, refreshToken });
  }
);

// Get all users
router.get("/users", (req, res) => {
  res.json(users);
});

// Refresh token
router.post("/token", async (req, res) => {
  const refreshToken = req.header("x-auth-token");

  // If token is not provided, send error message
  if (!refreshToken) {
    return res.status(401).json({
      errors: [
        {
          msg: "Token not found",
        },
      ],
    });
  }

  // If token does not exist, send error message
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({
      errors: [
        {
          msg: "Invalid refresh token",
        },
      ],
    });
  }

  try {
    const user = await JWT.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const { email } = user;
    const accessToken = await JWT.sign(
      { email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );
    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({
      errors: [
        {
          msg: "Invalid token",
        },
      ],
    });
  }
});

// Logout - Delete refresh token
router.delete("/logout", (req, res) => {
  const refreshToken = req.header("x-auth-token");

  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.sendStatus(204);
});

module.exports = router;
