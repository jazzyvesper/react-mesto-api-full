const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateId = Joi.string().length(24).hex();
const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат ссылки');
  }
  return value;
};

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex()
  }),
});

const validateUpDateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
});

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
    avatar: Joi.string().custom(validateURL).default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
});

const validateDeleteCard = celebrate({
  params: Joi.object().keys({
    cardId: validateId
  }),
});
const validateAddLikes = celebrate({
  params: Joi.object().keys({
    cardId: validateId
  }),
});

const validateDeleteLikes = celebrate({
  params: Joi.object().keys({
    cardId: validateId
  }),
});

module.exports = {
  validateUserId,
  validateUpDateUser,
  validateAvatar,
  validateSignUp,
  validateSignIn,
  validateCreateCard,
  validateDeleteCard,
  validateAddLikes,
  validateDeleteLikes,
};
