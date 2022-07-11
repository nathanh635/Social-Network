const mongoose = require('mongoose');

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true,     
    validate: [validateEmail, "Please fill a valid email address"],
  match: [
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    "Please fill a valid email address",
  ], },
});

const User = mongoose.model('User', userSchema);

const handleError = (err) => console.error(err);

// Will add data only if collection is empty to prevent duplicates
// Note that two documents can have the same name value


module.exports = User;
