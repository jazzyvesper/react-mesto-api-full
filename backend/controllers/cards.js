const Cards = require('../models/card');
const CardError = require('../error/CardError');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Cards.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CardError(400));
      } else {
        next(new CardError(500));
      }
    });
};

const findCard = (req, res, next) => {
  Cards.find({})
    .then((card) => res.send(card))
    .catch(() => next(new CardError(500)));
};

const newDelete = (req, res, next) => {
  const { cardId } = req.params;
  Cards.findById(cardId)
    .then((card) => {
      if (req.user._id !== String(card.owner)) {
        next(new CardError(403));
      } else {
        Cards.findByIdAndRemove(cardId)
          .orFail(new Error('Error'))
          .then((data) => res.send(data))
          .catch((err) => {
            if (err.name === 'CastError') {
              next(new CardError(400));
            } else if (err.name === 'Error') {
              next(new CardError(404));
            } else {
              next(new CardError(500));
            }
          });
      }
    })
    .catch(() => {
      next(new CardError(404));
    });
};

const addLikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Cards.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('Error'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CardError(400));
      } else if (err.name === 'Error') {
        next(new CardError(404));
      } else {
        next(new CardError(500));
      }
    });
};

const deleteLikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Cards.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('Error'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CardError(400));
      } else if (err.name === 'Error') {
        next(new CardError(404));
      } else {
        next(new CardError(500));
      }
    });
};

module.exports = {
  createCard,
  findCard,
  addLikeCard,
  deleteLikeCard,
  newDelete,
};
