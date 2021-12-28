var express = require("express");
var router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
/* GET home page. */

router.post("/login", async function (req, res, next) {
  const { email, password } = req.body;
  const cryptedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.findOne({
      where: { email: email },
    });

    const comparePassword = await bcrypt.compare(
      password,
      user.dataValues.password
    );

    const userRebuild = {
      first_name: user.dataValues.first_name,
      middle_name: user.dataValues.middle_name,
      last_name: user.dataValues.last_name,
      title: user.dataValues.title,
      email: user.dataValues.email,
      phone_number: user.dataValues.phone_number,
      industry_type: user.dataValues.industry_type,
      role_type: user.dataValues.role_type,
    };

    const access = jwt.sign(userRebuild, process.env.ACCESS_TOKEN, {
      expiresIn: "15m",
    });

    if (comparePassword) {
      return res
        .status(202)
        .cookie("access", access, {
          sameSite: "strict",
          path: "/",
          httpOnly: true,
        })
        .cookie("id", user.dataValues.id, {
          sameSite: "strict",
          path: "/",
          httpOnly: true,
        })
        .json({ user: userRebuild });
    } else return res.status(403).json({ error: "your email or password is not correct" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.post("/signup", async function (req, res, next) {
  const {
    title,
    firstName,
    middleName,
    lastName,
    email,
    phoneNumber,
    industryType,
    roleType,
    password,
  } = req.body.user;

  try {
    const cryptedPassword = await bcrypt.hash(password, 10);

    const userCreation = await User.create({
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      title: title,
      email: email,
      phone_number: phoneNumber,
      industry_type: industryType,
      role_type: roleType,
      password: cryptedPassword,
    });
    return res.json(userCreation);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/logout", async function (req, res, next) {
  res
    .status(202)
    .clearCookie("access")
    .clearCookie("id")
    .json({ success: "you have been logged out" });
});

router.get("/checkLogin", async function (req, res, next) {
  try {
    if (req.cookies.access != null) {
      res.status(200).json({ loggedIn: true });
    } else {
      res.status(200).json({ loggedIn: false });
    }
  } catch (error) {
    res.status(500).error({ error: "something went wrong" });
  }
});

module.exports = router;
