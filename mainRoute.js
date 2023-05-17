module.exports = (app) => {
  const user = require("./routes/user");
  const record = require("./routes/record");
  app.use("/api/user", user);
  app.use("/api/record", record);
};
