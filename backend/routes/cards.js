const router = require('express').Router();
const {
  createCard, findCard, addLikeCard, deleteLikeCard, newDelete,
} = require('../controllers/cards');
const {
  validateCreateCard, validateDeleteCard, validateAddLikes, validateDeleteLikes,
} = require('../middlewares/validator');

router.post('/', validateCreateCard, createCard);
router.get('/', findCard);
router.delete('/:cardId', validateDeleteCard, newDelete);
router.put('/:cardId/likes', validateAddLikes, addLikeCard);
router.delete('/:cardId/likes', validateDeleteLikes, deleteLikeCard);

module.exports = router;
