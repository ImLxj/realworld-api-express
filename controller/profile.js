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
		).select('+following') // select是强制加入不会显示的字段
		// includes 是判断字符串中是否有指定的子字符串 或者判断数组当中有指定的元素
		if (
			!followingUser.following
				.map((id) => id.toString())
				.includes(user._id.toString())
		) {
			followingUser.following.push(user._id)
			followingUser.save()
			res.status(200).json({
				message: '关注成功'
			})
		}
		res.status(200).json({
			message: '您已经关注了该用户'
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
		if (index > -1) {
			followingUser.following.splice(index, 1)
			followingUser.save()
			res.status(200).json({
				message: '取消关注用户成功'
			})
		}
		res.status(200).json({
			message: '您没有关注该用户'
		})
	} catch (error) {
		next(error)
	}
}
