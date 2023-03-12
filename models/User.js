// Import the mongoose library
const { Schema, model } = require("mongoose");

// Create a schema for the User model
const userSchema = new Schema(
  {
    // Include username, email, thoughts, and friends, with the appropriate data types and validations as outlined in the homework instructions
    username: { type: String, unique: true, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      required: true,
      //   mongoose validation for email
      match: [/.+@.+\..+/, "Must provide a valid email address"],
    },
    // Add a `thoughts` property that uses the `Thought` model's `_id` as its `ref`
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
    // Add a `friends` property that self-references the `User` model's `_id` as its `ref`
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    toJSON: {
      // tell Mongoose to include virtuals
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Initialize our User model
const User = model("user", userSchema);

module.exports = User;
