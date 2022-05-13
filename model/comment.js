const mongoose = require('mongoose')
const timeData = require('./baseModel')

const commentSchema = mongoose.Schema({
	...timeData,
	body: {
		type: String,
		required: true
	}
})

module.exports = commentSchema
