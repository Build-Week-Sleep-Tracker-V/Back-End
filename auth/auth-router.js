const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

const Users = require("./auth-model");
const { isValid, generateToken } = require("./auth-service");
const configVars = require("../config/vars");

router.post("/register", (req, res) => {
  const credentials = req.body;
  if (isValid(credentials)) {
    // hash it up
    const hash = bcryptjs.hashSync(credentials.password, configVars.rounds);
    credentials.password = hash;

    // save user to db
    Users.add(credentials)
      .then((user) => {
        res.status(201).json({ data: user });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } else {
    res.status(400).json({
      message:
        "Please provide all the proper credentials. Be sure that they are alphanumeric.",
    });
  }
});

module.exports = router;
