const {Router} = require('express');
const router = Router();

router.route('/:id')
  .get()
  .post()
  .delete()

router.use('/:id/attachments',require('./attachments.routes'));

module.exports = router;