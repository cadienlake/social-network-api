// Import the mongoose library
const { Schema, model } = require("mongoose");
// Import the reactionSchema from the Reaction model
const reactionSchema = require("./Reaction");
// Import the dateFormat() function from the utils folder
const dateFormat = require("../utils/dateFormat");
// Create a schema for the Thought model
const thoughtSchema = new Schema(
  {
    // Include the thoughtText, username, createdAt, and reactions fields, with the appropriate data types and validations as outlined in the homework instructions
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      // tell Mongoose to include getters so that the createdAt field can be formatted properly
      getters: true,
      //   tell Mongoose to include virtuals
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Initialize our Thought model
const Thought = model("Thought", thoughtSchema);
// Export the Thought model
module.exports = Thought;
