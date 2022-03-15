const express = require('express');
const router = express.Router();
const authorDetails = require('../controller/authorController');
const blogDetails = require('../controller/blogController');
const authorLogin = require('../controller/loginController');
const middleware = require('../middlewares/middleware.js');

router.post('/authors', authorDetails.author)

router.post('/blogs',middleware.authenticate, blogDetails.blog)

router.get('/blogs/:authorId',middleware.authenticate, blogDetails.getBlog)

router.put('/blogs/:authorId/:blogId',middleware.authenticate, middleware.authorize, blogDetails.editBlog)

router.delete('/blogs/:authorId/:blogId',middleware.authenticate, middleware.authorize, blogDetails.deleteBlogById)

router.delete('/blogs/:authorId',middleware.authenticate, middleware.authorize, blogDetails.deleteBlogByQuery)

router.get('/allblogs', blogDetails.getAllBlogs)

router.post('/login', authorLogin.login)

module.exports = router;