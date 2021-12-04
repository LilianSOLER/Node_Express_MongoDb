const jwt = require('jsonwebtoken');

const tokenKey = require('../config').dev.tokenKey;

module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    const decodedToken = jwt.verify(token, tokenKey);
    const userId = decodedToken.userId;
    if(req.body.userId && req.body.userId !== userId){
      throw 'User Id non valable'
    } else {
      next();
    }
  } catch(error){
    res.status(401).json({error : error || 'req non authentifié'});
  }
};