const express = require('express')
const router = express.Router()

// 列出文章
router.get('', (req, res, next) => {
	try {
		res.send(' get')
	} catch (error) {
		next(error)
	}
})

// 提要文章
router.get('/feed', (req, res, next) => {
	try {
		res.send('/feed get')
	} catch (error) {
		next(error)
	}
})

// 获取文章
router.get('/:slug', (req, res, next) => {
	try {
		res.send('/:slug get')
	} catch (error) {
		next(error)
	}
})

// 创建文章
router.post('', (req, res, next) => {
	try {
		res.send(' post')
	} catch (error) {
		next(error)
	}
})

// 更新文章
router.put('/:slug', (req, res, next) => {
	try {
		res.send('/:slug put')
	} catch (error) {
		next(error)
	}
})

// 删除文章
router.delete('/:slug', (req, res, next) => {
	try {
		res.send('/:slug delete')
	} catch (error) {
		next(error)
	}
})

// 为文章添加评论
router.post('/:slug/comments', (req, res, next) => {
	try {
		res.send('/:slug/comments post')
	} catch (error) {
		next(error)
	}
})

// 从文章中获取评论
router.get('/:slug/comments', (req, res, next) => {
	try {
		res.send('/:slug/comments get')
	} catch (error) {
		next(error)
	}
})

// 删除评论
router.delete('/:slug/comments/:id', (req, res, next) => {
	try {
		res.send('/:slug/comments/:id delete')
	} catch (error) {
		next(error)
	}
})

// 最喜欢的文章
router.post('/:slug/favorite', (req, res, next) => {
	try {
		res.send('/:slug/favorite post')
	} catch (error) {
		next(error)
	}
})

// 不喜欢的文章
router.delete('/:slug/favorite', (req, res, next) => {
	try {
		res.send('/:slug/favorite delete')
	} catch (error) {
		next(error)
	}
})

module.exports = router
