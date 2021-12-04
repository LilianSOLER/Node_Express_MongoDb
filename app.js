const express = require('express');
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const confDbMg = require('./config').dev.database.mongodb;

const app = express();

mongoose
  .connect(`mongodb+srv://${confDbMg.user}:${confDbMg.password}@${confDbMg.host}/${confDbMg.db}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to database'))
    .catch(() => console.log('Connection failed'));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app
  .use('/api/stuff', stuffRoutes)
  .use('/api/auth', userRoutes);


module.exports = app;