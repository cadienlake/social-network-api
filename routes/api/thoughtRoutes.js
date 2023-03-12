// require express router
const router = require("express").Router();
// require the thoughtController from the controllers folder and destructure the methods
const { getSingleThought, getThoughts, createThought, updateThought, removeThought, addReaction, removeReaction } = require("../../controllers/thoughtController");

// define the /api/thoughts routes and their methods (GET, POST)
router.route("/").get(getThoughts).post(createThought);
// define the /api/thoughts/:thoughtId routes and their methods (GET, PUT, DELETE)
router.route("/:thoughtId").get(getSingleThought).put(updateThought).delete(removeThought);
// define the /api/thoughts/:thoughtId/reactions route and its method (POST)
router.route("/:thoughtId/reactions").post(addReaction);
// define the /api/thoughts/:thoughtId/reactions/:reactionId route and its method (DELETE)
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
