// require the Thought and User models
const { Thought, User } = require("../models");

module.exports = {
  // get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  //   get a single thought by id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      //  if there's no thought with that id, return a 404 error, otherwise return the thought
      .then((thought) => (!thought ? res.status(404).json({ message: "No thought with that ID" }) : res.json(thought)))
      .catch((err) => res.status(500).json(err));
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        // add the thought's id to the user's thoughts array field using $addToSet to prevent duplicate ids
        return User.findOneAndUpdate({ _id: req.body.userId }, { $addToSet: { thoughts: thought._id } }, { new: true });
      })
      .then((userData) => res.json("Created the thought 🎉"));
  },
  // update a thought by id
  updateThought(req, res) {
    // Update the thought with the new data, and return the new thought
    // Set runValidators to true to ensure that the updated data meets the model's requirements.
    // Set new to true to return the new thought instead of the original.
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
      //  if there's no thought with that id, return a 404 error, otherwise return the thought
      .then((thought) => (!thought ? res.status(404).json({ message: "No thought with that ID" }) : res.json(thought)))
      .catch((err) => res.status(500).json(err));
  },
  // delete a thought by id
  removeThought(req, res) {
    // find the thought by id and delete it
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) => {
        // use the thought's userId to find the user, then pull the thought's id out of the user's thoughts array, then return the user, which will now have the thought's id removed from the array
        return User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } }, { new: true });
      })
      //   return a success message
      .then((user) => res.json({ message: "Thought deleted 🗑️", user }))
      .catch((err) => res.status(500).json(err));
  },
  // add a reaction to a thought
  addReaction(req, res) {
    // Add the reaction to the thought's reactions array using $addToSet to prevent duplicate reactions
    // Set runValidators to true to ensure that the updated data meets the model's requirements.
    // Set new to true to return the new thought instead of the original.
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true })
      // if there's no thought with that id, return a 404 error, otherwise return the thought
      .then((thought) => (!thought ? res.status(404).json({ message: "No reaction found with that ID :(" }) : res.json(thought)))
      .catch((err) => res.status(500).json(err));
  },
  // remove a reaction from thought
  removeReaction(req, res) {
    // find the thought by id and delete the reaction with the matching reactionId
    // Set runValidators to true to ensure that the updated data meets the model's requirements.
    // Set new to true to return the new thought instead of the original.
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { runValidators: true, new: true })
      // if there's no thought with that id, return a 404 error, otherwise return a success message
      .then((thought) => (!thought ? res.status(404).json({ message: "No reaction found with that ID :(" }) : res.json({ message: "Reaction deleted" })))
      .catch((err) => res.status(500).json(err));
  },
};
