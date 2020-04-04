// ------------------import all api------------------------------
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');





// --------------- connect to mongoosedb server ---------
mongoose.connect(`mongodb://${process.env.username_mlab}:${process.env.password_mlab}@ds263127.mlab.com:63127/covid19`,
                 { useNewUrlParser: true, useUnifiedTopology: true }, () =>{
                   console.log('connect mongoose db');
                 });

// ------------------------add middleware----------------------
//create app
const app = express();
// add body-parser parse json data
app.use(express.json());
// pasrse urlencoded data
app.use(express.urlencoded({ extended: true }));
// cross browser resource access
app.use(cors());
// -------------------------intialize port--------------------------------
const port = process.env.PORT || 8000;
// --------------------------add Routing-----------------------------------
//checker auth
app.use('/checker', (req, res, next) => {
  jwt.verify(req.header.authorization, process.env.secretPWD, (err, decoded) =>{
    if(err){
      console.log(err);
      res.status(201).json({
        success: false,
        message: 'checker fail to check'
      });
    } else {
      if(!decoded){
        res.status(201).json({
          success: false,
          message: 'auth fail/ token expired'
        });
      } else {
        res.status(201).json({
          success: true,
          message: 'auth successful!!'
        });
      }
    }
  })
});

// import routing
const userRoutes = require('./api/routes/user');
const blogRoutes = require('./api/routes/blog');

//user routes
app.use('/user', userRoutes);
app.use('/blog', blogRoutes);

//---------------- expose files for front-end----------------
app.use('/images', express.static(path.join(__dirname,'./assets/profile')));

app.listen(port, () => {
  console.log(`listen at port ${port}`);
});
