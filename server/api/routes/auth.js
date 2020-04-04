const User = require('../model/user');
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  jwt.verify(req.headers.authorization || req.body.token, process.env.secretPWD, (err, decoded) => {
    if(err) res.status(201).json({ success: false, message: err});
    else {
      req.auth = decoded.email;
      req.userId = decoded._id;
      next();
    }
  });
}
