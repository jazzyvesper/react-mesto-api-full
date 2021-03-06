const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
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
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
        .send(
          { message: 'Авторизация прошла успешно' },
        );
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

const deleteCoockie = (req, res) => {
  res.clearCookie('jwt', {
    sameSite: 'none',
    secure: true,
  });
  res.status(201).send(
    { message: 'Вы вышли из системы' },
  );
};

const findCurrent = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(201).send(user);
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
  deleteCoockie,
};
