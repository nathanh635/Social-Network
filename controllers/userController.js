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
  // Delete a user and associated apps
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
      User.findOneAndUpdate({ _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
              { new: true })

        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json({ message: 'Friend added!'} ))

        .catch((err) => res.status(500).json(err));
        User.findOneAndUpdate({ _id: req.params.friendId },
          { $addToSet: { friends: req.params.userId } },
                { new: true })
  
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json({ message: 'Also added to other friend list!'} ))
          .catch((err) => res.status(500).json(err));
    },

    //delete friend
    deleteFriend(req, res) {
      User.findOneAndUpdate({ _id: req.params.userId })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : User.findOneAndUpdate(
              { _id: req.params.userId },
              { $pull: { friends: friendId } }),
              User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $pull: { friends: userId } })
        )
        .then(() => res.json({ message: 'Friend deleted!' }))
        .catch((err) => res.status(500).json(err));
    },

};
