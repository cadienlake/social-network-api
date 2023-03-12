//  import the Schema constructor and model function from Mongoose
const { Schema, Types } = require("mongoose");
// import the dateFormat() function from the utils folder
const dateFormat = require("../utils/dateFormat");
// create the Reaction schema
const reactionSchema = new Schema(
  {
    // include the reactionId, reactionBody, username, and createdAt fields with the appropriate data types and validations as outlined in the homework instructions
    reactionId: { type: Schema.Types.ObjectId, default: new Types.ObjectId() },
    reactionBody: { type: String, required: true, maxLength: 280 },
    username: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      // Set getters to true to allow the createdAt field to be formatted properly
      getters: true,
    },
    id: false,
  }
);

// export the Reaction model
module.exports = reactionSchema;
