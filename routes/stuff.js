const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

router
  .post('/', stuffCtrl.createThing)
  .get('/:id', stuffCtrl.getThing)
  .get('/', stuffCtrl.getAllThings)
  .put('/:id', stuffCtrl.modifyThing)
  .delete('/:id', stuffCtrl.deleteThing);

module.exports = router;