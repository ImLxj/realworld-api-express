const express = require('express')
const router = express.Router()

// 获取个人资料
router.get('/:username', (req, res, next) => {
	try {
		res.send('/:username get')
	} catch (error) {
		next(error)
	}
})

// 关注用户
router.post('/:username/follow', (req, res, next) => {
	try {
		res.send('/:username/follow post')
	} catch (error) {
		next(error)
	}
})

// 取消关注用户
router.delete('/:username/follow', (req, res, next) => {
	try {
		res.send('/:username/follow delete')
	} catch (error) {
		next(error)
	}
})

module.exports = router
