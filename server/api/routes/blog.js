const express = require('express');
const router = express.Router();
const Mult = require('./multerFile');
const Auth = require('./auth');
const consol = require('./console');
const Blog = require('../model/blog');
const mongoose = require('mongoose');

// post blog post
router.post('/add-post', Mult.single('image'), consol,  Auth, (req, res, next) => {
  let blog = new Blog({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    subTitle: req.body.subTitle,
    category: req.body.category,
    paragraph: req.body.paragraph,
    image: `http://${req.headers.host}/images/${req.file.filename}`,
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    author: req.userId
  });
  blog.save().then( result => {
    res.status(200).json({
      data: result,
      success: true,
      message: 'add post successful!!'
    });
  });
});

// get all post posted by author/user
router.get('/author-blog-list', consol, Auth, (req, res, next) => {
  Blog.find( { author: req.userId }).populate('author').then( result => {
    res.status(200).json({
      data: result,
      success: true,
      message: 'fetch blog list successful!!'
    });
  });
});

// get all posts

router.get('/lists',consol,  (req, res, next) => {
    Blog.find().populate('author').then( result => {
      res.status(200).json(result);
    });
});


// find blog by id
router.get('/blog-list/:id', consol, (req ,res, next) => {
  console.log(req.params);
    Blog.findOne( { _id: req.params.id } ).populate('author').then( result => {
      console.log(result);
      res.status(200).json(result);
    } );
});

module.exports = router;
