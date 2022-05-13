const mongoose = require('mongoose')
const baseModel = require('./baseModel')
const commentSchema = require('./comment')
const Schema = mongoose.Schema

const articleSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	tagList: {
		type: [String],
		default: null
	},
	...baseModel,
	favoritesCount: {
		type: Number,
		default: 0
	},
	// 获取到users集合里面的id通过id查询到数据
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	comments: [commentSchema]
})

module.exports = articleSchema
