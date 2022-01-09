const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./db');
const bcrypt = require('bcrypt');
const Options = require('./config');

app.use(express.json());
app.use(cors());

app.get('/login/:username/:password', (req, res) => {
  User.find({ username: req.params.username })
    .then(async (data) => {
      let userInfo = {};
      let match = await bcrypt.compare(req.params.password, data[0].password);
      if (match) {
        userInfo._id = data[0]._id;
        userInfo.username = data[0].username;
        userInfo.color = data[0].color;
        userInfo.darkMode = data[0].darkMode;
        userInfo.showTimestamps = data[0].showTimestamps;
        userInfo.colorblind = data[0].colorblind;
      }
      return res.status(200).send({ match, userInfo });
    })
    .catch((err) => res.status(404).send(err));
});

app.post('/signup', (req, res) => {
  User.create({ username: req.body.username, password: req.body.password })
    .then((data) => res.status(201).send({ username: data.username }))
    .catch((err) => res.status(404).send(err));
});

app.put('/preferences', (req, res) => {
  User.findOneAndUpdate(
    { username: req.body.username },
    {
      color: req.body.color,
      darkMode: req.body.darkMode,
      colorblind: req.body.colorblind,
      showTimestamps: req.body.showTimestamps,
    },
    {
      new: true,
    }
  )
    .then((data) =>
      res.status(201).send({
        username: data.username,
        color: data.color,
        darkMode: data.darkMode,
        colorblind: data.colorblind,
        showTimestamps: data.showTimestamps,
      })
    )
    .catch((err) => res.status(404).send(err));
});

app.listen(3002, () => {
  console.log(`listening on ${Options.host}:3002`);
});
