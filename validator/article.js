const { body, param } = require('express-validator')
const validator = require('../middleware/validator')
const mongoose = require('mongoose')
const { Article } = require('../model')

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
		console.log(req.article.author)
		console.log(req.user._id)
		if (req.user._id.toJSON() !== req.article.author.toJSON()) {
			return res.status(403).json({
				message: '您没有权限操作该文章'
			})
		}
		next()
	}
]

exports.deleteArticle = exports.queryArticleId
