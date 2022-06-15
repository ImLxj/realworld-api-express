const mongoose = require('mongoose')
const timeData = require('./baseModel')
const Schema = mongoose.Schema
const commentSchema = mongoose.Schema({
	...timeData,
	body: {
		type: String,
		required: true
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	articleId: {
		type: Schema.Types.ObjectId,
		ref: 'Article'
	}
})

module.exports = commentSchema
