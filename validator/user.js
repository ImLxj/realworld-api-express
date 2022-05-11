const { body } = require('express-validator')
const validator = require('../middleware/validator')
const { User } = require('../model')
const md5 = require('../util/md5')

exports.register = validator([
	// 配置验证规则
	body('user.username')
		.notEmpty()
		.withMessage('用户名不能为空')
		.bail()
		.custom(async (value) => {
			const user = await User.findOne({ username: value })
			if (user) {
				return Promise.reject('用户名已存在')
			}
		}),
	body('user.email')
		.notEmpty()
		.withMessage('邮箱不能为空')
		.isEmail()
		.withMessage('邮箱格式不正确')
		.bail()
		.custom(async (email) => {
			const user = await User.findOne({ email })
			if (user) {
				return Promise.reject('邮箱已存在')
			}
		}),
	body('user.password').notEmpty().withMessage('密码不能为空')
])

exports.login = [
	validator([
		body('user.email').notEmpty().withMessage('邮箱不能为空'),
		body('user.password').notEmpty().withMessage('密码不能为空')
	]),
	validator([
		body('user.email').custom(async (email, { req }) => {
			const user = await User.findOne({ email }).select([
				'email',
				'username',
				'password',
				'bio',
				'image'
			])
			if (!user) {
				return Promise.reject('邮箱不存在')
			}
			console.log(user)
			// 将res.user挂载到中间件当中，后续的中间件也可以使用了
			req.user = user
		})
	]),
	validator([
		body('user.password').custom(async (password, { req }) => {
			if (md5(password) !== req.user.password) {
				return Promise.reject('密码输入错误')
			}
		})
	])
]
