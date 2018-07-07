const express = require('express');
const user_controller = require('./controller');
const { verifyToken } = require('../../middlewares');

const router = express.Router();

router.get('/', user_controller.user_get);
router.get('/following', user_controller.following_get);
router.get('/follower', user_controller.follower_get);
router.get('/bookmarks', verifyToken, user_controller.bookmark_list_get);
router.post('/bookmark', verifyToken, user_controller.bookmark_post);
router.post('/follow', verifyToken, user_controller.follow_post);
module.exports = router;
