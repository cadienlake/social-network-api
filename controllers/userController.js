// require the User and Thought models
const { User, Thought } = require("../models");
// require the Thought model so we can remove the user's thoughts when the user is deleted from the database
const { getThoughts } = require("./thoughtController");

module.exports = {
  // get all users
  getUsers(req, res) {
    User.find()
      // populate the thoughts and friends fields with the data from the Thought and User models respectively
      .populate("thoughts")
      .populate("friends")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // get a single user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      //   populate the thoughts and friends fields with the data from the Thought and User models respectively
      .populate("thoughts")
      .populate("friends")
      //   if there's no user with that id, return a 404 error, otherwise return the user
      .then((user) => (!user ? res.status(404).json({ message: "No user found with that ID" }) : res.json(user)))
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // update a user by id
  updateUser(req, res) {
    // update the user with the new data, and return the new user
    // $set is a MongoDB operator that tells the database to update the data with the new data
    // set runValidators to true to ensure that the updated data meets the model's requirements
    // set new to true to return the new user instead of the original
    User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true })
      // if there's no user with that id, return a 404 error, otherwise return the user
      .then((user) => (!user ? res.status(404).json({ message: "No user with that ID" }) : res.json(user)))
      .catch((err) => res.status(500).json(err));
  },
  // delete a user by id
  removeUser(req, res) {
    // delete the user with the specified id
    User.findOneAndDelete({ _id: req.params.userId })
      // remove the user's thoughts from the Thought model as well.
      .then((user) => {
        return Thought.deleteMany({
          _id: { $in: user.thoughts },
        });
      })
      // if there's no user with that id, return a 404 error, otherwise return a success message
      .then((user) => (!user ? res.status(404).json({ message: "No user with that ID" }) : res.json({ message: "user deleted" })))
      .catch((err) => res.status(500).json(err));
  },
  // add a friend to a user's friend list
  addFriend(req, res) {
    // Update the user's friend list by adding the friend's id to the user's friend list array using $addToSet. This will prevent duplicate friend ids from being added to the array.
    // Set runValidators to true to ensure that the new friend id is a valid id and return the updated user.
    // set new to true to return the new user instead of the original
    User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { runValidators: true, new: true })
      // If there's no user with that id, return a 404 error, otherwise return the user
      .then((user) => (!user ? res.status(404).json({ message: "No user found with that ID :(" }) : res.json(user)))
      .catch((err) => res.status(500).json(err));
  },
  // remove a friend from a user's friend list
  removeFriend(req, res) {
    // Update the user's friend list by removing the friend's id from the user's friend list array using $pull.
    // Set runValidators to true to ensure that the friend id is a valid id and return the updated user.
    // set new to true to return the new user data instead of the original
    User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { runValidators: true, new: true })
      //  if there's no friend with that id, return a 404 error, otherwise return a success message
      .then((friend) => (!friend ? res.status(404).json({ message: "No friend found with that ID :(" }) : res.json({ message: "Friend deleted!" })))
      .catch((err) => res.status(500).json(err));
  },
};
