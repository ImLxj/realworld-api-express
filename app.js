const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./router/index')
const errorHandler = require('./middleware/error-handler')
require('./model')
const app = express()

app.use(express.json())
app.use(morgan('dev')) // 默认日志
app.use(cors())

const PORT = process.env.PORT || 3000

app.use('/api', router)

// 挂载统一处理服务器错误的中间件
app.use(errorHandler())

app.listen(PORT, () => {
	console.log('服务器启动成功', `http://localhost:${PORT}`)
})
