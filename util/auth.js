const jwt = require('../util/jwt')
const { jwtSelect } = require('../config/config.default')
const { User } = require('../model')

module.exports = async (req, res, next) => {
	let token = req.headers['authorization']
	token = token ? token.split('Bearer ')[1] : null
	console.log(token)
	if (!token) {
		return res.status(401).json({
			error: '没有权限'
		})
	}

	try {
		const Id = await jwt.verify(token, jwtSelect)
		console.log(Id)
		req.user = await User.findById(Id.userId)
		next()
	} catch (err) {
		return res.status(401).json({
			error: '权限认证失败'
		})
	}
}
