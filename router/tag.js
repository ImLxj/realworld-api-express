const express = require('express')
const router = express.Router()

// 获取标签
router.get('/tags', (req, res, next) => {
	try {
		res.send('tags')
	} catch (error) {
		next(error)
	}
})

module.exports = router
