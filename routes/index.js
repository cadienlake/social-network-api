// require the express router, and the apiRoutes folder
const router = require("express").Router();
const apiRoutes = require("./api");
// define the /api route
router.use("/api", apiRoutes);
// Return a wrong route message if the user tries to access a route that doesn't exist
router.use((req, res) => {
  return res.send("Wrong route!");
});

module.exports = router;
