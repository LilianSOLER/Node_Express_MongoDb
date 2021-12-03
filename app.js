const express = require('express');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/api/stuff', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Object created!',
  });
});

app.get('/api/stuff', (req, res, next) => {
  const stuff = [
    {
      _id: '1',
      title: 'First',
      description: 'First description',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 1000,
      userId: '1',
    },
    {
      _id: '2',
      title: 'Second',
      description: 'Second description',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 2000,
      userId: '2',
    },
    {
      _id: '3',
      title: 'Third',
      description: 'Third description',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 3000,
      userId: '3',
    },
  ];
  res.status(200).json(stuff);
});


module.exports = app;