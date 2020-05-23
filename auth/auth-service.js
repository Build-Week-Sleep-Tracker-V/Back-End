module.exports = {
  isValid,
  generateToken,
};

function isValid(user) {
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

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, configVars.jwtSecret, options);
}
