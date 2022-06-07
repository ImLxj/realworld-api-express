const jwt = require('../util/jwt')
const { jwtSelect } = require('../config/config.default')
const { User } = require('../model')

// 权限认证
module.exports = async (req, res, next) => {
	let token = req.headers['authorization']
	token = token ? token.split('Bearer ')[1] : null
	if (!token) {
		return res.status(200).json({
			error: '没有权限'
		})
	}

	try {
		const Id = await jwt.verify(token, jwtSelect)
		// 这个才是当前登录用户的全局中间件信息 只有经过这个中间件才可以访问到当前用户的信息
		req.user = await User.findById(Id.userId)
		next()
	} catch (err) {
		return res.status(200).json({
			error: '权限认证失败'
		})
	}
}
