const Entries = require("./entries-model");

module.exports = {
  validateUserId,
};

function validateUserId(req, res, next) {
  const userId = req.params.id;
  Entries.findBy(userId)
    .then((entries) => {
      req.entries = entries;
      next();
    })
    .catch((err) => {
      res.status(400).json({ error: "No entry found with that userId" });
    });
}
