// server.js
require("dotenv").config();
const app = require("./server");
require("../config/db");
const swaggerDocs = require("../swagger");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  swaggerDocs(app, PORT);
});
