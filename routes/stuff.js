const express = require('express');
const router = express.Router();

const Thing = require('../models/Thing');

router
  //POST
  .post('/', (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Object created' }))
    .catch(error => res.status(400).json({ error }));
  })
  //GET
  .get('/:id', (req, res, next) => {
    Thing.findOne({_id: req.params.id})
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  })
  .get('/', (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
  })
  //PUT
  .put('/:id', (req, res, next) => {
    Thing.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
      .then(() => res.status(200).json({ message: 'Object updated' }))
      .catch(error => res.status(400).json({ error }));
  })
  //DELETE
  .delete('/:id', (req, res, next) => {
  Thing.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({ message: 'Object deleted' }))
    .catch(error => res.status(400).json({ error }));
  });

module.exports = router;