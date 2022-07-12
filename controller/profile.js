const { User } = require('../model')
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
		// 点赞的人
		const user = req.user
		// 被点赞的
		const followingUser = await User.findById(
			req.followingUser._id.toString()
		).select('+following')

		if (
			!followingUser.following
				.map((id) => id.toString())
				.includes(user._id.toString())
		) {
			followingUser.following.push(user._id)
			followingUser.save()
		}
		res.status(200).json({
			message: '关注成功'
		})
	} catch (error) {
		next(error)
	}
}
// 取消关注用户
exports.unFollowUser = async (req, res, next) => {
	try {
		const followingUser = await User.findById(
			req.followingUser._id.toString()
		).select('+following')
		const index = followingUser.following.indexOf(req.user._id.toString())
		console.log(index)
		if (index > -1) {
			followingUser.following.splice(index, 1)
			followingUser.save()
		}
		res.status(200).json({
			message: '取消关注用户成功'
		})
	} catch (error) {
		next(error)
	}
}
