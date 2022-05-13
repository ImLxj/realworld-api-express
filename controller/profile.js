// 获取个人资料
exports.getProfile = async (req, res, next) => {
	try {
		const user = req.user
		res.status(200).json({
			profile: user
		})
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
