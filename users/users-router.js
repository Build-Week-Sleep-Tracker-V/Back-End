const router = require("express").Router();

const Users = require("../auth/auth-model");

const { isRegisterValid } = require("../auth/auth-service");

// Delete a user
router.delete("/:id", (req, res) => {
  Users.remove(req.params.id)
    .then((deleted) => {
      if (deleted) {
        res.status(200).json({
          message: `Removed user with the id of ${req.params.id}`,
        });
      } else {
        res
          .status(404)
          .json({ message: `Could not find user with id of ${req.params.id}` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
