// require express router
const router = require("express").Router();
// require the userController from the controllers folder and destructure the methods
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  removeUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// define the /api/users routes and their methods (GET, POST)
router.route("/").get(getUsers).post(createUser);

// define the /api/users/:userId routes and their methods (GET, PUT, DELETE)
router.route("/:userId").get(getSingleUser).put(updateUser).delete(removeUser);

// define the /api/users/:userId/friends/:friendId route and its methods (POST, DELETE)
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;