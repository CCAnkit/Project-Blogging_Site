const express = require('express');
const router = express.Router();
const authorController = require('../controller/authorController.js');
const blogController = require('../controller/blogController.js');
const authorLogin = require('../controller/loginController.js');
const middleware = require('../middlewares/middleware.js');

//authors
router.post('/authors', authorController.author) //create authors

router.post('/login', authorLogin.login) //login

//blogs
router.post('/blogs',middleware.authenticate, blogController.createBlog) //create blogs

router.get('/blogs/:authorId',middleware.authenticate, blogController.getBlog) //get blogs

router.put('/blogs/:authorId/:blogId',middleware.authenticate, middleware.authorize, blogController.updateBlog) //update blogs

//delete
router.delete('/blogs/:authorId/:blogId',middleware.authenticate, middleware.authorize, blogController.deleteBlogById)  //delete by Id

router.delete('/blogs/:authorId',middleware.authenticate, middleware.authorize, blogController.deleteBlogByQuery)  //delete by Query

router.get("/getAllBlogs", blogController.getAllBLogs)

module.exports = router;