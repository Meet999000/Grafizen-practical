const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
require("./database/mongodb");
const runServer = require("./mainRoute");

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "HEAD"],
};
app.use(cors(corsOpts));
app.use(express.json());
runServer(app);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
