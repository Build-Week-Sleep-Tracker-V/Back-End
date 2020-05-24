const jwt = require("jsonwebtoken");
const configVars = require("../config/vars");

module.exports = {
  isRegisterValid,
  isLoginValid,
  generateToken,
};

function isRegisterValid(user) {
  return Boolean(
    user.firstName &&
      typeof user.firstName === "string" &&
      user.lastName &&
      typeof user.lastName === "string" &&
      user.email &&
      typeof user.email === "string" &&
      user.password &&
      typeof user.password === "string"
  );
}

function isLoginValid(user) {
  return Boolean(
    user.firstName &&
      typeof user.firstName === "string" &&
      user.lastName &&
      typeof user.lastName === "string" &&
      user.password &&
      typeof user.password === "string"
  );
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, configVars.jwtSecret, options);
}
