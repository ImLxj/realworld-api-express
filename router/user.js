const express = require('express')
const router = express.Router()
const userCtrl = require('../controller/user')
const userRegister = require('../validator/user')
// 用户登录
router.post('/users/login', userCtrl.login)

// 用户注册
router.post('/users', userRegister.register, userCtrl.register)

// 获取当前用户
router.get('/user', userCtrl.getUser)

// 更新当前登录用户
router.put('/user', userCtrl.putUser)

module.exports = router
