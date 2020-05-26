const Entries = require("./entries-model");

module.exports = {
  validateUserId,
};

function validateUserId(req, res, next) {
  console.log(req.params);
  const userId = req.params.id;
  Entries.findByUserId(userId)
    .then((entries) => {
      console.log(entries);
      req.entries = entries;
      next();
    })
    .catch((err) => {
      res.status(400).json({ error: "No entry found with that userId" });
    });
}
