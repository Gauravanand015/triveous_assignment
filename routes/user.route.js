const express = require("express");
const { UserModel } = require("../model/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.post("/register", async (req, res) => {
  let { name, email, password } = req.body;

  const user = await UserModel.find({ email: email });
  try {
    if (user.length == 0) {
      bcrypt.hash(password, 6, async (err, hash) => {
        const userDetails = new UserModel({
          name,
          email,
          password: hash,
        });

        await userDetails.save();
        res.send("User Registered").status(201);
      });
    } else {
      res.send("Email is already registered");
    }
  } catch (error) {
    console.log(error);
    res.send("Error While registering route");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.find({ email: email });
  try {
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          let token = jwt.sign(
            { email: user[0].email, _id: user[0]._id },
            "ALPHA"
          );
          res
            .send({
              Message: "login Successful",
              token: token,
            })
            .status(201);
        } else {
          console.log(err);
          res.send("Something while comparing password");
        }
      });
    } else {
      res.send("Email is not registered please register first");
    }
  } catch (error) {
    console.log(error);
    res.send("Error While login");
  }
});

module.exports = {
  userRouter,
};
