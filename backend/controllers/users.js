const bcrypt = require('bcryptjs'); // импортируем bcrypt

const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NewError = require('../error/NewError');

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send({ _id: user._id, email: user.email });
    })
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NewError(400));
      } else if (err.name === 'MongoError' && err.code === 11000) {
        next(new NewError(409));
      } else {
        next(new NewError(500));
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' }),
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NewError(400));
      } else if (err.name === 'Error') {
        next(new NewError(401));
      } else {
        next(new NewError(500));
      }
    });
};

const findCurrent = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(201).send({ _id: user._id, email: user.email });
    })
    .catch(() => next(new NewError(500)));
};

const findUser = (req, res, next) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(() => next(new NewError(500)));
};

const findByIdUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new Error('Error'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NewError(400));
      } else if (err.name === 'Error') {
        next(new NewError(404));
      } else {
        next(new NewError(500));
      }
    });
};

const upDateUser = (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .orFail(new Error('Error'))
  // вернём записанные в базу данные
    .then((user) => res.send(user))
  // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NewError(400));
      } else if (err.name === 'Error') {
        next(new NewError(400));
      } else {
        next(new NewError(500));
      }
    });
};

const upDateAvatarUser = (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .orFail(new Error('Error'))
  // вернём записанные в базу данные
    .then((user) => res.send(user))
  // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NewError(400));
      } else if (err.name === 'Error') {
        next(new NewError(404));
      } else {
        next(new NewError(500));
      }
    });
};

module.exports = {
  createUser,
  findUser,
  findByIdUser,
  upDateUser,
  upDateAvatarUser,
  login,
  findCurrent,
};
