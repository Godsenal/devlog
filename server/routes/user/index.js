const express = require('express');
const user_controller = require('./controller');
const { verifyToken } = require('../../middlewares');

const router = express.Router();

// router.get('/', user_controller.user_get);
router.post('/bookmark', verifyToken, user_controller.bookmark_post);

module.exports = router;
