module.exports = {
  isEntryValid,
};

function isEntryValid(entry) {
  return Boolean(
    entry.date &&
      typeof entry.date === "number" &&
      entry.timeSlept &&
      typeof entry.timeSlept === "number" &&
      entry.mood &&
      typeof entry.mood === "number" &&
      entry.userId &&
      typeof entry.userId === "number"
  );
}
