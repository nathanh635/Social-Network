const mongoose = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
  username:{type: String, required: true},
  createdAt: { type: Date, default: Date.now, get: formatDate }, //add a getter method to format the timestamp
  reactions: [Reaction],
},
{
  //allow virtuals
  toJSON: {
    virtuals: true
  },});

  function formatDate(date) {
      return date.toLocaleDateString();
    }



const Thought = mongoose.model('Thought', thoughtSchema);

const handleError = (err) => console.error(err);

//set up virtual for reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});


module.exports = Thought;
