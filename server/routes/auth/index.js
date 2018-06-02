const express = require('express');
const auth_controller = require('./controller');
const { verifyToken } = require('../../middlewares');

const router = express.Router();

router.post('/login', auth_controller.login_post);
router.post('/signup', auth_controller.signup_post);
router.post('/validate', auth_controller.validate_post);
router.get('/verify', verifyToken, auth_controller.verify_get);

router.put('/pins/:postid', auth_controller.pins_put);
router.put('/followings/:userid', auth_controller.followings_put);

module.exports = router;
