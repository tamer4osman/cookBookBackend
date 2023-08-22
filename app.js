const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const apiRouter = require("./routers/api"); // Import the api.js file
dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
