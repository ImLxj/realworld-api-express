const util = require('util')
// 错误中间件
module.exports = () => {
	return (err, req, res, next) => {
		res.status(500).json({
			error: util.format(err),
		})
	}
}
