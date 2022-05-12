const express = require('express')
const router = express.Router()
const articleCtrl = require('../controller/article')
const auth = require('../util/auth')
const articleEdit = require('../validator/article')
// 列出文章
router.get('', articleCtrl.listArticles)

// 提要文章
router.get('/feed', articleCtrl.feedArticle)

// 获取文章
router.get('/:articleId', articleEdit.queryArticleId, articleCtrl.getArticle)

// 创建文章
router.post('', auth, articleEdit.createArticle, articleCtrl.createArticle)

// 更新文章
router.put(
	'/:articleId',
	auth,
	articleEdit.queryArticleId,
	articleCtrl.updateArticle
)

// 删除文章
router.delete('/:articleId', articleCtrl.deleteArticle)

// 为文章添加评论
router.post('/:articleId/comments', articleCtrl.addComments)

// 从文章中获取评论
router.get('/:articleId/comments', articleCtrl.getComments)

// 删除评论
router.delete('/:articleId/comments/:id', articleCtrl.deleteComments)

// 最喜欢的文章
router.post('/:articleId/favorite', articleCtrl.favoriteArticle)

// 不喜欢的文章
router.delete('/:articleId/favorite', articleCtrl.unfavoriteArticle)

module.exports = router
