const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
mongoose.Promise = global.Promise;
const Options = require('./config');

mongoose.connect(`${Options.mongo}`, { useNewUrlParser: true }, (err) => {
  if (err) {
    throw err;
  }
  console.log('DB Connected');
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  color: { type: String, default: 'rgb(0, 0, 0)' },
  darkMode: { type: Boolean, default: false },
  colorblind: { type: Boolean, default: false },
  showTimestamps: { type: Boolean, default: false },
});

userSchema.pre('save', function (next) {
  var thisUser = this;
  if (!thisUser.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(thisUser.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      thisUser.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = (attempted, cb) => {
  bcrypt.compare(attempted, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
