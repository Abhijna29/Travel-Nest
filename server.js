const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const port = 3021;

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/travelnest');
const db = mongoose.connection;
db.once('open', () => {
  console.log('Mongodb connection successful');
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const Users = mongoose.model('users', userSchema);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received data:', req.body);
  const user = new Users({
    email,
    password,
  });
  try {
    await user.save();
    console.log('User saved:', user);
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log('Server started');
});
