const express = require('express');
const router = express.Router();
const dis = require('./console');
const User = require('../model/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const upload = require('./multerFile');
const Auth = require('./auth');

router.post('/signup', dis, (req, res, next) => {
  // add signup form data to mongoose database
    //check user exist
    User.findOne({ email: req.body.email }, (err, check) => {
      if(err) {
        res.status(201).json({
          success: false,
          message: err
        });
      } else {
        if(check){
          res.status(200).json({
            success: false,
            message: 'account is already exist!!'
          });
        } else {
          bcrypt.hash(req.body.password, 10 , (err, hash) =>{
            console.log(hash);
          let user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            phone: Number(req.body.phone),
            password: hash,
            role: req.body.role
          });
          user.save().then( result => {
              if(result){
                res.status(200).json({
                  success: true,
                  message: 'signup successful!!'
                });
              }
            }).catch(err =>{
              if(err){
                res.status(200).json({
                  success: false,
                  message: err
                });
              }
            });;
          });
        }
      }
    });

});

//login
router.post('/login', dis, (req, res, next) => {
  if(isNaN(Number(req.body.username))){
    loginHandler(req, res, next, 'email');
  } else {
    loginHandler(req, res, next, 'phone');
  }
});

//login handler
function loginHandler(req, res, next, usename){
  const checkData = usename === 'email' ? {email: req.body.username} : {phone: req.body.username} ;
  User.findOne( checkData , (err, result) =>{
    if(err){
      res.status(200).json({
        success: true,
        message: err
      });
    } else{
      if(!result){
        res.status(201).json({
          success: false,
          message: usename+' does not exist!!'
        });
      } else {
        bcrypt.compare(req.body.password, result.password, (err, resultant) => {
          if(err){
            res.status(201).json({
              success: false,
              message: err
            });
          } else {
            if(!resultant){
              res.status(200).json({
                success: false,
                message: 'wrong password!!'
              });
            } else {
              console.log(result);
              const token = jwt.sign(result.toJSON(), process.env.secretPWD, { expiresIn: 60*60 });
              res.status(201).json({
                token: token,
                success: true,
                message: 'login successful!!'
              });
            }
          }
        });
      }
    }
  });
}

//upload image
router.post('/profile-image', upload.single('profile-image'), Auth, dis, (req, res, next)=> {
  console.log(req.auth);
  User.updateOne( { email: req.auth },
                  { $set: { image: `http://${req.headers.host}/images/${req.file.filename}` } })
                  .then(result => {
                    console.log('-------------update-------')
                    console.log(result);
                    res.status(200).json({
                      data: { url:`http://${req.headers.host}/images/${req.file.filename}` },
                      success: true,
                      message: 'image upload successful!!'
                    });
                  });
})

// get profile
router.get('/profile',dis , Auth, (req, res, next) => {
  User.findOne( { email: req.auth }).then( result => {
    res.status(200).json({
      data: result,
      success: true,
      message: 'get profile successful!!'
    });
  } );
});

// update profile
router.put('/role', dis, Auth, (req, res, next) => {
  User.updateOne( { email: req.auth }, { $set: { role: req.body.role} } ).then( result => {
    res.status(201).json({
      data: result,
      success: true,
      message: 'role update successful!!'
    });
  });
});

module.exports = router;
