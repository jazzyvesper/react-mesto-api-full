const router = require('express').Router();
const { validateUserId, validateUpDateUser, validateAvatar } = require('../middlewares/validator');
const {
  findUser,
  findByIdUser,
  upDateUser,
  upDateAvatarUser,
  findCurrent,
} = require('../controllers/users');

router.get('/', findUser);
router.get('/me', findCurrent);
router.get('/:userId', validateUserId, findByIdUser);
router.patch('/me', validateUpDateUser, upDateUser);
router.patch('/me/avatar', validateAvatar, upDateAvatarUser);

module.exports = router;
