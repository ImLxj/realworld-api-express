const mongoose = require('mongoose')
const timeData = require('./baseModel')
const Schema = mongoose.Schema

const commentSchema = mongoose.Schema({
	...timeData,
	body: {
		type: String,
		required: true
	},
	userInfo: {
		type: [String]
	}
})

module.exports = commentSchema
