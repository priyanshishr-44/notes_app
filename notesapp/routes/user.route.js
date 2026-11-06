const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { userModel } = require("../model/user.model");

const userRouter = express.Router();

// REGISTER
userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).send("All fields are required");
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).send("User already registered");
    }

    const hash = await bcrypt.hash(password, 5);

    const user = new userModel({
      name,
      email,
      password: hash
    });

    await user.save();

    res.status(201).send("User Registered successfully");

  } catch (error) {
    console.log(error);
    res.status(500).send("Can't Register successfully");
  }
});


// LOGIN
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send("User is not Registered");
    }

    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      return res.status(401).send("Wrong Password");
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.send({
      msg: "Login Successfully",
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).send("Login failed");
  }
});


// LOGOUT
userRouter.post("/logout", (req, res) => {
  res.send("Logout successful. Please remove token from client storage.");
});

module.exports = { userRouter };