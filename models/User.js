const { Schema, model } = require('mongoose');


//set up email validation function

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

//set up new schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true,   
    //email validation using regex  
    validate: [validateEmail, "Please fill a valid email address"],
  match: [
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    "Please fill a valid email address",
  ], },
  friends: [
    {
      //list of friends referencing itself
        type: Schema.Types.ObjectId,
        ref: 'User',
}
  ],
  thoughts: [
    {
      //array of thought schemas
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ]
},
{
  //allow virtuals
  toJSON: {
    virtuals: true,
  },
});

const User = model('User', userSchema);


//set up virtual for friendCount
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});


module.exports = User;
