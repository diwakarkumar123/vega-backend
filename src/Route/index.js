const express = require('express')
const router = express.Router()

const user=require("./user")
const blog=require("./Blog")

router.use('/',user)
router.use('/',blog)

module.exports= router