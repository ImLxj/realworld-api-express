const { body, param } = require('express-validator')
const validator = require('../middleware/validator')
const mongoose = require('mongoose')
const { Article, Comment } = require('../model')

// 插入文章校验
exports.createArticle = validator([
	body('article.title').notEmpty().withMessage('标题不能为空'),
	body('article.description').notEmpty().withMessage('文章摘要不能为空'),
	body('article.body').notEmpty().withMessage('文章内容不能为空')
])

// 查询文章校验
exports.queryArticleId = [
	validator([
		param('articleId').custom(async (value) => {
			if (!mongoose.isValidObjectId(value)) {
				return Promise.reject('文章id类型错误')
			}
		})
	]),
	// 校验文章是否存在
	async (req, res, next) => {
		const articleId = req.params.articleId
		const article = await Article.findById(articleId)
		req.article = article
		if (!article) {
			return res.status(404).json({
				message: '该文章不存在'
			})
		}
		next()
	},
	// 修改文章的作者是否是当前登录用户
	async (req, res, next) => {
		if (!req.user)
			return res.status(400).json({
				message: '当前用户不存在'
			})
		next()
	}
]
// 删除文章校验
exports.deleteArticle = [
	validator([
		param('articleId').custom(async (value) => {
			if (!mongoose.isValidObjectId(value)) {
				return Promise.reject('文章id类型错误')
			}
		})
	]),
	// 校验文章是否存在
	async (req, res, next) => {
		const articleId = req.params.articleId
		const article = await Article.findById(articleId)
		const comment = await Comment.findOne({articleId})
		if (!article) {
			return res.status(201).json({
				message: '该文章不存在',
				status: 201
			})
		} else {
			req.article = article
			if (comment) {
				req.comment = comment
			}
		}
		next()
	},
	// 修改文章的作者是否是当前登录用户
	async (req, res, next) => {
		if (!req.user)
			return res.status(201).json({
				message: '当前用户不存在',
				status: 201
			})
		if (req.user._id.toJSON() !== req.article.author.toJSON()) {
			return res.status(201).json({
				message: '您没有权限操作该文章',
				status: 201
			})
		}
		next()
	}
]

// 为当前文章添加评论
exports.addComments = [
	param('articleId').custom(async (value) => {
		if (!mongoose.isValidObjectId(value)) {
			return Promise.reject('文章id类型错误')
		}
	}),
	// 校验文章是否存在
	async (req, res, next) => {
		const articleId = req.params.articleId
		const article = await Article.findById(articleId).populate('author', [
			'username',
			'image'
		])
		req.article = article
		if (!article) {
			return res.status(404).json({
				message: '该文章不存在'
			})
		}
		next()
	}
]

// 查询当前文章的评论
exports.Comments = [
	validator([
		param('articleId').custom(async (value) => {
			if (!mongoose.isValidObjectId(value)) {
				return Promise.reject('文章id类型错误')
			}
		})
	]),
	// 校验文章是否存在
	async (req, res, next) => {
		const articleId = req.params.articleId
		const article = await Article.findById(articleId)
		req.article = article
		if (!article) {
			return res.status(404).json({
				message: '该文章不存在'
			})
		}
		next()
	}
]

// 删除评论
exports.deleteComments = [
	validator([
		param('articleId').custom(async (value) => {
			if (!mongoose.isValidObjectId(value)) {
				return Promise.reject('文章id类型错误')
			}
		}),
		param('commentId').custom(async (value) => {
			if (!mongoose.isValidObjectId(value)) {
				return Promise.reject('评论id类型错误')
			}
		})
	]),
	// 校验文章是否存在
	async (req, res, next) => {
		const articleId = req.params.articleId
		const comment = await Comment.findOne({articleId})
		const article = await Article.findById(articleId)
		req.comment = comment
		req.article = article
		if (!comment) {
			return res.status(404).json({
				message: '该文章不存在'
			})
		}
		next()
	},
	// 修改文章的作者是否是当前登录用户
	async (req, res, next) => {
		if (req.user._id.toJSON() !== req.article.author.toJSON()) {
			return res.status(403).json({
				message: '您没有权限操作该文章'
			})
		}
		next()
	}
]

// 添加喜欢的文章
exports.favorite = [
	validator([
		param('articleId').custom(async (value) => {
			if (!mongoose.isValidObjectId(value)) {
				return Promise.reject('文章id类型错误')
			}
		})
	]),
	async (req, res, next) => {
		const articleId = req.params.articleId
		const article = await Article.findById(articleId)
		req.article = article
		if (!article) {
			return res.status(404).json({
				message: '该文章不存在'
			})
		}
		next()
	}
]
