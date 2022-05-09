const { User } = require('../model')
// 用户登录
exports.login = async (req, res, next) => {
	try {
		console.log(req.body)
		res.send('/users/login post')
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
			user,
		})
	} catch (error) {
		next(error)
	}
}
// 获取当前用户
exports.getUser = async (req, res, next) => {
	try {
		res.send('/users get')
	} catch (error) {
		next(error)
	}
}
// 更新当前用户
exports.putUser = async (req, res, next) => {
	try {
		res.send('/user put')
	} catch (error) {
		next(error)
	}
}
