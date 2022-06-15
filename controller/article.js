const { Article, User, Comment } = require('../model')

// 列出文章
exports.listArticles = async (req, res, next) => {
	try {
		const { limit = 20, offset = 0, tag, author } = req.query
		const filter = {}
		if (tag) {
			filter.tagList = tag
		}

		if (author) {
			const user = await User.findOne({
				username: author
			})
			filter.author = user ? user._id.toString() : null
		}

		const articles = await Article.find(filter)
			.skip(Number.parseInt(offset)) // 跳过多少条
			.limit(Number.parseInt(limit)) // 查询多少条
			.sort({
				createAt: -1
			})
			.populate('author', ['username', 'image']) //
		// 查询所有文章数量
		const articlesCount = await Article.countDocuments(filter)
		res.status(200).json({
			articles,
			articlesCount
		})
	} catch (error) {
		next(error)
	}
}
// 当前用户创建的文章
exports.feedArticle = async (req, res, next) => {
	try {
		const articles = req.userArticle

		if (!articles) {
			return res.status(400).json({
				message: '您没有发布任何文章,赶快发布一篇把！'
			})
		}
		res.status(200).json(articles)
	} catch (error) {
		next(error)
	}
}
// 获取文章
exports.getArticle = async (req, res, next) => {
	try {
		const articleData = await Article.findById(req.params.articleId).populate(
			'author',
			['username', 'bio', 'image', 'following']
		)

		if (!articleData) {
			res.status(404).json({
				message: '没有查询到当前文章'
			})
		}
		res.status(200).json({
			articleData
		})
	} catch (error) {
		next(error)
	}
}
// 创建文章
exports.createArticle = async (req, res, next) => {
	try {
		const articleInfo = req.body.article
		const tagList = articleInfo.tagList.split(' ')
		articleInfo.tagList = tagList
		const article = new Article(articleInfo)
		article.author = req.user._id
		// 通过定义的数据类型，将users集合通过id查询到的信息映射到author里面，但是不会改变插入的数据，原本插入的author是_id数据库里面也还是_id
		article.populate('author', ['username', 'bio', 'image', 'following'])
		await article.save()
		res.status(200).json({
			article
		})
	} catch (error) {
		next(error)
	}
}
// 更新文章
exports.updateArticle = async (req, res, next) => {
	try {
		// article是当前查询到的文章
		const article = req.article
		const bodyArticle = req.body.article
		article.title = bodyArticle.title || article.title
		article.description = bodyArticle.description || article.description
		article.body = bodyArticle.body || article.body
		await article.save()
		res.status(200).json({
			article
		})
	} catch (error) {
		next(error)
	}
}
// 删除文章
exports.deleteArticle = async (req, res, next) => {
	try {
		const article = req.article
		await article.remove()
		res.status(204).json({
			message: '删除文章成功'
		})
	} catch (error) {
		next(error)
	}
}
// 为文章添加评论
exports.addComments = async (req, res, next) => {
	try {
		const commentInfo = req.body.comment
		// 这样做的方法是将个人信息存到评论里面，这样用户修改头像可以刷新
		const user = await User.findOne({ username: commentInfo.author.username })
		let author = []
		author[0] = user._id
		author[1] = user.username
		author[2] = user.image
		let comment = {
			body: commentInfo.body,
			author
		}
		const article = req.article
		article.comments.push(comment)
		await article.save()
		res.status(201).json({
			article
		})
	} catch (error) {
		next(error)
	}
}
// 获取评论
exports.getComments = async (req, res, next) => {
	try {
		// 获取到一个文章当中的所有评论
		const comments = req.article.comments
		res.status(200).json({
			comments
		})
	} catch (error) {
		next(error)
	}
}
// 删除评论
exports.deleteComments = async (req, res, next) => {
	try {
		const commentId = req.params.commentId
		const article = req.article
		article.comments.forEach((item, index) => {
			if (item._id.toString() === commentId) {
				article.comments.splice(index, 1)
			}
		})
		await article.save()
		res.status(201).json({
			comment: article.comments
		})
	} catch (error) {
		next(error)
	}
}
// 最喜欢的文章
exports.favoriteArticle = async (req, res, next) => {
	try {
		const article = req.article
		await Article.updateMany(
			{ _id: article._id },
			{ $set: { favoritesCount: article.favoritesCount + 1 } }
		)
		res.status(200).json({
			message: '点赞成功'
		})
	} catch (error) {
		next(error)
	}
}
// 不喜欢的文章
exports.unfavoriteArticle = async (req, res, next) => {
	try {
		res.send('/:slug/favorite delete')
	} catch (error) {
		next(error)
	}
}
