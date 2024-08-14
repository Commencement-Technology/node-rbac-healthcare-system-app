const express = require("express");
const app = express();
app.use(express.json());

app.use("/", require("./routes/auth"));
//app.use("/", require("./routes/resource"));
app.use("/", require("./routes/admin"));
app.use("/", require("./routes/doctors"));
app.use("/", require("./routes/patients"));

module.exports = app;
