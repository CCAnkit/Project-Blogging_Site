const express = require('express');
const router = express.Router();
const authorController = require('../controller/authorController.js');
const blogController = require('../controller/blogController.js');
const authorLogin = require('../controller/loginController.js');
const middleware = require('../middlewares/middleware.js');

//author
router.post('/authors', authorController.author) //create authors

router.post('/login', authorLogin.login) //login api

//blog
router.post('/blogs',middleware.authenticate, blogController.blog) //create blog

router.get('/blogs/:authorId',middleware.authenticate, blogController.getBlog) //

router.put('/blogs/:authorId/:blogId',middleware.authenticate, middleware.authorize, blogController.editBlog)

//delete
router.delete('/blogs/:authorId/:blogId',middleware.authenticate, middleware.authorize, blogController.deleteBlogById)

router.delete('/blogs/:authorId',middleware.authenticate, middleware.authorize, blogController.deleteBlogByQuery)

// router.get('/allblogs', blogDetails.getAllBlogs)


module.exports = router;