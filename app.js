const express = require('express')

const app = express()

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
	res.send('hello world')
})

app.listen(PORT, () => {
	console.log('服务器启动成功', `http://localhost:${PORT}`)
})
