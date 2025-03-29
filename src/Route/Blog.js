const express = require('express')
const router = express.Router()
const blogapi = require("../controler/blog")
const { userAuth } = require('../middleware/auth')


router.post('/blogPost',userAuth, blogapi.blogPost)
// router.post('/login', userapi.login)
router.get('/fetchAllBlogPost', userAuth, blogapi.fetchAllBlogPost)
router.patch('/Post/:id',userAuth, blogapi.updateBlogPost)
router.delete('/deleteBlogPost/:id',userAuth, blogapi.deleteBlogPost)
router.get('/blogDetails/:id',userAuth, blogapi.blogDetails)


module.exports= router
