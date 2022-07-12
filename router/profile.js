const express = require('express')
const router = express.Router()
const profileCtrl = require('../controller/profile')
const profileValidator = require('../validator/user')
const auth = require('../util/auth')

// 获取个人资料
router.get('/:username', auth, profileCtrl.getProfile)

// 关注用户
router.post(
	'/:id/follow',
	auth,
	profileValidator.userId,
	profileCtrl.followUser
)

// 取消关注用户 
router.delete(
	'/:id/follow',
	auth,
	profileValidator.userId,
	profileCtrl.unFollowUser
)

module.exports = router
