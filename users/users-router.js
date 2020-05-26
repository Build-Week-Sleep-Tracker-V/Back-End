const bcryptjs = require("bcryptjs");

const router = require("express").Router();

const Users = require("../auth/auth-model");

const { isRegisterValid } = require("../auth/auth-service");

const configVars = require("../config/vars");

// Get a list of all users
router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Delete a user
router.delete("/:id", (req, res) => {
  Users.remove(req.params.id)
    .then((deleted) => {
      if (deleted) {
        Users.removeAllEntriesByUserId(req.params.id).then((deleted) => {
          if (deleted) {
            res.status(200).json({
              message: `Removed user with the id of ${req.params.id} and the ${deleted} entries associated with it.`,
            });
          } else {
            res.status(200).json({
              message: `Removed user with id of ${req.params.id} but there were no entries associated with it to delete.`,
            });
          }
        });
      } else {
        res
          .status(404)
          .json({ message: `Could not find user with id of ${req.params.id}` });
      }
    })
    .catch((err) => {
      res.status(501).json({ error: err.message });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  if (isRegisterValid(changes)) {
    // hash it up
    const hash = bcryptjs.hashSync(changes.password, configVars.rounds);
    changes.password = hash;

    Users.update(changes, id)
      .then((updatedUser) => {
        res.status(200).json({
          updatedUser: {
            id: id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } else {
    res.status(400).json({
      message:
        "Please provide all the fields needed. Be sure that they are alphanumeric.",
    });
  }
});

module.exports = router;
