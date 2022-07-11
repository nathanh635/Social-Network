const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionID: { type: String, required: true, minLength: 1, maxLength: 280 },
  reactionBody: { type: String, required: true, maxLength: 280 }, //add a getter method to format the timestamp
  username: { type: String, required: true},
  createdAt: { type: Date, default: Date.now }, //add a getter method to format the timestamp
});

const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
  createdAt: { type: Date, default: Date.now }, //add a getter method to format the timestamp
  reactions: [reactionSchema],
});

const Thought = mongoose.model('Thought', thoughtSchema);

const handleError = (err) => console.error(err);

// Will add data only if collection is empty to prevent duplicates
// Note that two documents can have the same name value


module.exports = Thought;
