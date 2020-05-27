module.exports = {
  isEntryValid,
};

function isEntryValid(entry) {
  return Boolean(
    entry.sleepStart &&
      typeof entry.sleepStart === "string" &&
      entry.sleepEnd &&
      typeof entry.sleepEnd === "string" &&
      entry.mood &&
      typeof entry.mood === "number" &&
      entry.userId &&
      typeof entry.userId === "number"
  );
}
