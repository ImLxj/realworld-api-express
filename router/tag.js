const express = require('express')
const router = express.Router()
const tagCtrl = require('../controller/tag')

// 获取标签
router.get('/tags', tagCtrl.getTags)

module.exports = router
