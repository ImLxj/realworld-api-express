const express = require('express')
const router = express.Router()
const profileCtrl = require('../controller/profile')
const auth = require('../util/auth')

// 获取个人资料
router.get('/:username', auth, profileCtrl.getProfile)

// 关注用户
router.post('/:username/follow', auth, profileCtrl.followUser)

// 取消关注用户
router.delete('/:username/follow', auth, profileCtrl.unFollowUser)

module.exports = router
