const { User } = require('../model')
const jwt = require('../util/jwt')
const { jwtSelect } = require('../config/config.default')
// 用户登录
exports.login = async (req, res, next) => {
	try {
		const user = req.user.toJSON()
		const token = await jwt.sing(
			{
				userId: user._id
			},
			jwtSelect,
			{ expiresIn: '24h' }
		)
		delete user.password
		res.status(200).json({
			...user,
			token
		})
	} catch (error) {
		next(error)
	}
}
// 用户注册
exports.register = async (req, res, next) => {
	try {
		// 数据验证
		let user = new User(req.body.user)
		// 保存到数据库
		await user.save()
		user = user.toJSON()
		delete user.password
		// 基本数据验证
		// 业务数据验证
		// 成功响应
		res.status(201).json({
			user
		})
	} catch (error) {
		next(error)
	}
}
// 获取当前用户
exports.getUser = async (req, res, next) => {
	try {
		res.status(200).json({
			user: req.user
		})
	} catch (error) {
		next(error)
	}
}
// 更新当前用户
exports.putUser = async (req, res, next) => {
	try {
		const userInfo = req.body.userInfo
		const user = await User.findById(req.user._id)
		user.email = userInfo.email || user.email
		user.username = userInfo.username || user.username
		user.bio = userInfo.bio || user.bio
		user.image = userInfo.image || user.image
		await user.save()
		res.status(200).json({
			user
		})
	} catch (error) {
		next(error)
	}
}