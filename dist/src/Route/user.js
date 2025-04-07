"use strict";
const express = require('express');
const router = express.Router();
const userapi = require("../controler/auth");
const { userAuth } = require('../middleware/auth');
router.post('/register', userapi.CreateAccount);
router.post('/login', userapi.login);
router.get('/getUserInfo', userAuth, userapi.getUserInfo);
module.exports = router;
