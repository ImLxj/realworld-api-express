const mongoose = require('mongoose')
const timeData = require('./baseModel')
const Schema = mongoose.Schema
const commentSchema = mongoose.Schema({
	...timeData,
	content: [
		{
			body: String,
			author: {
				type: Schema.Types.ObjectId,
				ref: 'User'
			},
			createTime: String,
			...timeData
		}
	],
	articleId: {
		type: Schema.Types.ObjectId,
		ref: 'Article'
	}
})

module.exports = commentSchema
