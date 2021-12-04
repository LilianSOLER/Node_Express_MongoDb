const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router
  .post('/', auth, multer, stuffCtrl.createThing)
  .get('/:id', auth, stuffCtrl.getThing)
  .get('/', auth, stuffCtrl.getAllThings)
  .put('/:id', auth, multer, stuffCtrl.modifyThing)
  .delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;