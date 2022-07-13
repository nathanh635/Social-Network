const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and associated thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
    // Update a user
    updateUser(req, res) {
      User.findOneAndUpdate({ _id: req.params.userId },
        {$set: {username: req.body.username,
      email: req.body.email}})
        .then(() => res.json({ message: 'User updated!' }))
        .catch((err) => res.status(500).json(err));
    },

    //add friend
    addFriend(req, res) {
      let IDs = [req.params.userId, req.params.friendId];
      User.findOneAndUpdate({ _id: IDs[0] },
        { $addToSet: { friends: IDs[1]} },
              { new: true })
        .then(() =>
        //Add userID as a friend to friends' list as well
        User.findOneAndUpdate({ _id: IDs[1] },
          { $addToSet: { friends: IDs[0]} },
                { new: true }))
                .then(() => res.json({ message: 'Friend added!' }))
        .catch((err) => res.status(500).json(err));
    },

    //delete friend 
    deleteFriend(req, res) {
      let IDs = [req.params.userId, req.params.friendId];
      User.findOneAndUpdate({ _id: IDs[0] },
        { $pull: { friends: IDs[1]} },
              { new: true })
        .then(() =>
        //delete from friend's list as well.
        User.findOneAndUpdate({ _id: IDs[1] },
          { $pull: { friends: IDs[0]} },
                { new: true }))
                .then(() => res.json({ message: 'Friend deleted!' }))
        .catch((err) => res.status(500).json(err));
    },

};
