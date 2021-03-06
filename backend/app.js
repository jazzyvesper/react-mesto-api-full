require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const userRoter = require('./routes/users');
const cardRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const { createUser, login, deleteCoockie } = require('./controllers/users');
const errorsHandler = require('./middlewares/errorsHandler');
const { validateSignUp, validateSignIn } = require('./middlewares/validator');
const NewError = require('./error/NewError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use(requestLogger); // подключаем логгер запросов

app.use(cookieParser());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validateSignUp, createUser);
app.post('/signin', validateSignIn, login);
app.get('/signout', deleteCoockie);
app.use(auth);
app.use('/users', userRoter);
app.use('/cards', cardRouter);
app.use('*', (req, res, next) => {
  next(new NewError(404, 'Запрашиваемый ресурс не найден.'));
});

app.use(errorLogger); // подключаем логгер ошибок

// валидация запросов
app.use(errors());

// обработчик ошибок
app.use(errorsHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
