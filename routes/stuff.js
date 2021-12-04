const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');

router
  .post('/', auth, stuffCtrl.createThing)
  .get('/:id', auth, stuffCtrl.getThing)
  .get('/', auth, stuffCtrl.getAllThings)
  .put('/:id', auth,  stuffCtrl.modifyThing)
  .delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;