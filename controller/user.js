// 用户登录
exports.login = async (req, res, next) => {
	try {
		console.log(res.body);
		res.send('/users/login post')
	} catch (error) {
		next(error)
	}
}
// 用户注册
exports.register = async (req, res, next) => {
	try {
		res.send('/users post')
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
