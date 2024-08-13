require("dotenv").config();
const app = require("./server");
require("../config/db");
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
