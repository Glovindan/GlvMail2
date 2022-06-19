const {Router} = require('express');
const router = Router();
const userController = require('../controllers/user.controller')

router.route('/')
  .post(userController.createUser)

router.route('/:id')
  .get(userController.getOneUser)
  .delete(userController.deleteUser)

module.exports = router;