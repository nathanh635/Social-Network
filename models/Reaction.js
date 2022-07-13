const { Schema, Types, Model } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {       type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
    reactionBody: { type: String, required: true, maxLength: 280 }, //add a getter method to format the timestamp
    username: { type: String, required: true},
    createdAt: { type: Date, default: Date.now }, //add a getter method to format the timestamp
  });

  module.exports = reactionSchema;