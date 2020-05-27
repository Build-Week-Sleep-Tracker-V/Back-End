module.exports = {
  isEntryValid,
};

function isEntryValid(entry) {
  return Boolean(
    entry.date &&
      typeof entry.sleepStart === "string" &&
      entry.timeSlept &&
      typeof entry.sleepEnd === "string" &&
      entry.mood &&
      typeof entry.mood === "number" &&
      entry.userId &&
      typeof entry.userId === "number"
  );
}
