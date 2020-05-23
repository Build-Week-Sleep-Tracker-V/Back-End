module.exports = {
  jwtSecret: process.env.JWT_SECRET || "supersecretsecrets",
  pgConnection:
    process.env.DATABASE_URL || "postgresql://postgres@localhost/users",
  rounds: process.env.BCRYPT_ROUNDS || 12,
};
