const express = require('express')
const router = express.Router()

// 用户登录
router.post('/users/login', (req, res, next) => {
	try {
		res.send('/users/login post')
	} catch (error) {
		next(error)
	}
})

// 用户注册
router.post('/users', (req, res, next) => {
	try {
		res.send('/users post')
	} catch (error) {
		next(error)
	}
})

// 获取当前用户
router.get('/user', (req, res, next) => {
	try {
		res.send('/users get')
	} catch (error) {
		next(error)
	}
})

// 更新当前登录用户
router.put('/user', (req, res, next) => {
	try {
    res.send('/user put')
	} catch (error) {
		next(error)
	}
})

module.exports = router