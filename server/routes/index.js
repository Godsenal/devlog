const express = require('express');
const auth = require('./auth');
const post = require('./post');
const tag = require('./tag');

const router = express.Router();

router.use('/auth', auth);
router.use('/post', post);
router.use('/tag', tag);

module.exports = router;
