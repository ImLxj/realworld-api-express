// 列出文章
exports.listArticles = async (req, res, next) => {
	try {
		res.send(' get')
	} catch (error) {
		next(error)
	}
}
// 提要文章
exports.feedArticle = async (req, res, next) => {
	try {
		res.send('/feed get')
	} catch (error) {
		next(error)
	}
}
// 获取文章
exports.getArticle = async (req, res, next) => {
	try {
		res.send('/:slug get')
	} catch (error) {
		next(error)
	}
}
// 创建文章
exports.createArticle = async (req, res, next) => {
	try {
		res.send(' post')
	} catch (error) {
		next(error)
	}
}
// 更新文章
exports.updateArticle = async (req, res, next) => {
	try {
		res.send('/:slug put')
	} catch (error) {
		next(error)
	}
}
// 删除文章
exports.deleteArticle = async (req, res, next) => {
	try {
		res.send('/:slug delete')
	} catch (error) {
		next(error)
	}
}
// 为文章添加评论
exports.addComments = async (req, res, next) => {
	try {
		res.send('/:slug/comments post')
	} catch (error) {
		next(error)
	}
}
// 获取评论
exports.getComments = async (req, res, next) => {
	try {
		res.send('/:slug/comments get')
	} catch (error) {
		next(error)
	}
}
// 删除评论
exports.deleteComments = async (req, res, next) => {
	try {
		res.send('/:slug/comments/:id delete')
	} catch (error) {
		next(error)
	}
}
// 最喜欢的文章
exports.favoriteArticle = async (req, res, next) => {
	try {
		res.send('/:slug/favorite post')
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
