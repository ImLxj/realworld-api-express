const express = require('express')
const router = express.Router()
const articleCtrl = require('../controller/article')
const auth = require('../util/auth')
const articleValidator = require('../validator/article')
// 列出文章
router.get('', articleCtrl.listArticles)

// 当前用户创建的文章
router.get(
	'/feed/:authorId',
	auth,
	articleValidator.userArticle,
	articleCtrl.feedArticle
)

// 获取文章
router.get(
	'/:articleId',
	auth,
	articleValidator.queryArticleId,
	articleCtrl.getArticle
)

// 创建文章
router.post('', auth, articleValidator.createArticle, articleCtrl.createArticle)

// 更新文章
router.put(
	'/:articleId',
	auth,
	articleValidator.queryArticleId,
	articleCtrl.updateArticle
)

// 删除文章
router.delete(
	'/:articleId',
	auth,
	articleValidator.deleteArticle,
	articleCtrl.deleteArticle
)

// 为文章添加评论
router.post(
	'/:articleId/comments',
	auth,
	articleValidator.addComments,
	articleCtrl.addComments
)

// 从文章中获取评论
router.get(
	'/:articleId/comments',
	articleValidator.Comments,
	articleCtrl.getComments
)

// 删除评论
router.delete(
	'/:articleId/comments/:commentId',
	auth,
	articleValidator.deleteComments,
	articleCtrl.deleteComments
)

// 最喜欢的文章
router.post(
	'/:articleId/favorite',
	auth,
	articleValidator.favorite,
	articleCtrl.favoriteArticle
)

// 不喜欢的文章
router.delete('/:articleId/favorite', auth, articleCtrl.unfavoriteArticle)

module.exports = router
