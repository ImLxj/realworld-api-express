// 获取个人资料
exports.getProfile = async (req, res, next) => {
	try {
		res.send('/:username get')
	} catch (error) {
		next(error)
	}
}
// 关注用户
exports.followUser = async (req, res, next) => {
	try {
		res.send('/:username/follow post')
	} catch (error) {
		next(error)
	}
}
// 取消关注用户
exports.unFollowUser = async (req, res, next) => {
	try {
		res.send('/:username/follow delete')
	} catch (error) {
		next(error)
	}
}
