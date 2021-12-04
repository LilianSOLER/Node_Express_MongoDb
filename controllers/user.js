const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
    });
    user.save()
      .then(() => { res.status(201).json({ message: 'User created!' }) })
      .catch(error => { res.status(400).json({ error }) });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'User not found!' });
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then(result => {
            if (!result) {
              return res.status(401).json({ error: 'Wrong password!' });
            } else {
              res.status(200).json({
                message: 'Auth successful',
                userId: user._id,
                token: jwt.sign(
                  { userId: user._id},
                  'Random_token_secret',
                  { expiresIn: '24h'}
                )
              });
            }
              })
          .catch(error => res.status(500).json({ error }));
        }})
      .catch(error => res.status(500).json({ error }));
};
