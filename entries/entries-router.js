const router = require("express").Router();

const Entries = require("./entries-model");

const { validateUserId } = require("./entries-middleware");

const { isEntryValid } = require("./entries-service");

// GET all entries
router.get("/", (req, res) => {
  Entries.find()
    .then((entries) => {
      res.status(200).json(entries);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// GET up to 5 entries by user_id
router.get("/:id/user", validateUserId, (req, res) => {
  Entries.findByUserId(req.params.id)
    .then((entries) => {
      console.log(entries);
      res.status(200).json({ data: entries });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

// POST a new entry
router.post("/", (req, res) => {
  const newEntry = req.body;
  if (isEntryValid(newEntry)) {
    Entries.add(newEntry)
      .then((entry) => {
        res.status(201).json({ data: entry });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } else {
    res.status(400).json({
      message: "Please provide all of the components to make a new entry.",
    });
  }
});

// PUT to edit an entry by entry id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  if (isEntryValid(changes)) {
    Entries.update(changes, id)
      .then((updatedEntry) => {
        res.status(200).json({ updatedEntry: req.body });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } else {
    res.status(400).json({
      message: "Please provide all of the components to make a new entry.",
    });
  }
});

// DELETE an entry based on entry id
router.delete("/:id", (req, res) => {
  Entries.remove(req.params.id).then((deleted) => {
    if (deleted) {
      res
        .status(200)
        .json({ message: `Successfully removed entry ${req.params.id}` });
    } else {
      res.status(404).json({ message: `Could not find entry ${id}` });
    }
  });
});

module.exports = router;
