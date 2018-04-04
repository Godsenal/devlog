const express = require('express');
const auth_controller = require('./controller');

const router = express.Router();

router.post('/signin', auth_controller.signin_post);
router.post('/signup', auth_controller.signup_post);
router.post('/verify', auth_controller.verify_post);

router.put('/pins/:postid', auth_controller.pins_put);
router.put('/followings/:userid', auth_controller.followings_put);

module.exports = router;
