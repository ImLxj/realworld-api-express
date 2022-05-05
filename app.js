const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./router/index')

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

const PORT = process.env.PORT || 3000

app.use('/api', router)

app.listen(PORT, () => {
	console.log('服务器启动成功', `http://localhost:${PORT}`)
})
