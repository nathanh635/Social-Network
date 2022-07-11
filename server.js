const express = require('express');
const db = require('./config/connection');
// Require models
const { User, Thought } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Creates a new user
app.post('/api/users', (req, res) => {
  const newUser = new User({ username: req.body.username, email: req.body.email });
  newUser.save();
  if (newUser) {
    res.status(201).json(newUser);
  } else {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Finds all users
app.get('/api/users', (req, res) => {
  // Using model in route to find all documents that are instances of that model
  Users.find({}, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
});

// Finds the first matching user
app.get('/api/users/:id', (req, res) => {
  // Using model in route to find all documents that are instances of that model
  Users.findOne({ _id: `ObjectId ${req.params.id}` }, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
});

// Finds first document matching parameter and deletes
// For demo, use 'Wine' as URL param
app.delete('/api/users/:id', (req, res) => {
  Users.findOneAndDelete(
    { _id: `ObjectId ${req.params.id}` },
    (err, result) => {
      if (result) {
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
      }
    }
    //delete a user's associated thoughts when deleted
  );
});

app.put('/api/users/:id', (req, res) => {

  const filter =({_id: `ObjectId ${req.params.id}`})
  const update=({username: req.body.username}, {email: req.body.email})
  Users.findOneAndUpdate(filter, update, { new: true }, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  });

});

//--------------------------------------------

// Finds all thoughts
app.get('/api/thoughts', (req, res) => {
  // Using model in route to find all documents that are instances of that model
  Thoughts.find({}, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
});

// Finds the first matching thought
app.get('/api/thoughts/:id', (req, res) => {
  // Using model in route to find all documents that are instances of that model
  Thoughts.findOne({ _id: `ObjectId ${req.params.id}` }, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
});

// Creates a new thought
app.post('/api/thoughts', (req, res) => {
  const newThought = new Thought({ thoughtText: req.body.text });
  newThought.save();
  if (newUser) {
    res.status(201).json(newThought);
  } else {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.delete('/api/thoughts/:id', (req, res) => {
  Thoughts.findOneAndDelete(
    { _id: `ObjectId ${req.params.id}` },
    (err, result) => {
      if (result) {
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
      }
    }
    //update in user's list of thoughts
  );
});

app.put('/api/thoughts/:id', (req, res) => {

  const filter =({_id: `ObjectId ${req.params.id}`})
  const update=({thoughtText: req.body.text})
  Thoughts.findOneAndUpdate(filter, update, { new: true }, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  });

});

//---------------------------------------------------

// Creates a new friend
app.post('/api/users/:userId/friends/:friendId', (req, res) => {
  Users.findOne({ _id: `ObjectId ${req.params.userId}` }, (err, result) => {
    if (result) {
      User
      res.status(200).json(result);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
});

//deletes a friend

app.delete('/api/users/:userId/friends/:friendId', (req, res) => {
  Users.findOneAndDelete(
    { _id: `ObjectId ${req.params.id}` },
    (err, result) => {
      if (result) {
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
      }
    }
    //delete a user's associated thoughts when deleted
  );
});

//-------------------------------------------------


//new reaction
app.post('/api/thoughts/:thoughtId/reactions', (req, res) => {
  Thoughts.findOne({ _id: `ObjectId ${req.params.thoughtId}` }, (err, result) => {
    if (result) {
      User
      res.status(200).json(result);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
});

//deletes a reaction

app.delete('/api/thoughts/:thoughtId/reactions', (req, res) => {
  Thoughts.findOneAndDelete(
    { _id: `ObjectId ${req.params.thoughtId}` },
    (err, result) => {
      if (result) {
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
      }
    }
    //delete a user's associated thoughts when deleted
  );
});


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
