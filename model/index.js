const mongoose = require('mongoose')
const { dbUrl } = require('../config/config.default')
const db = mongoose.createConnection(
	dbUrl,
	{
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) {
			console.log('数据库连接失败')
			return
		}
		console.log('数据库连接成功')
	}
)

// 导出组织模型
module.exports = {
	User: db.model('User', require('./user')),
  Article: db.model('Article', require('./article'))
}
