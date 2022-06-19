const {Router} = require('express');
const router = Router();

router.route('/:id')
  .get()

module.exports = router;