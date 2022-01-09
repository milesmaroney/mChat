const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./db');
const bcrypt = require('bcrypt');
const Options = require('./config');

app.use(express.json());
app.use(cors());

app.get('/hello', (req, res) => res.send('Hello Smile'));

app.get('/login/:username/:password', (req, res) => {
  User.find({ username: req.params.username })
    .then(async (data) => {
      let userInfo;
      let match = await bcrypt.compare(req.params.password, data[0].password);
      if (match) {
        userInfo = data[0];
      }
      return res.status(200).send({ match, userInfo });
    })
    .catch((err) => res.status(404).send(err));
});

app.post('/signup', (req, res) => {
  console.log(req);
  User.create({ username: req.body.username, password: req.body.password })
    .then((data) => res.status(201).send(data))
    .catch((err) => res.status(404).send(err));
});

app.listen(3002, () => {
  console.log(`listening on ${Options.host}:3002`);
});
