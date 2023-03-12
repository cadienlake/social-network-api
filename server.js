// Require the Express module, the connection to the database, and the routes folder
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");
// define the port and the express app
const PORT = 3001;
const app = express();
// Define middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
// when the database is connected, start the server
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
