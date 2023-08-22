const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require('path');
const apiRouter = require("./routers/api"); // Import the api.js file
dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Specify the directory for views

app.use(bodyParser.json());
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
