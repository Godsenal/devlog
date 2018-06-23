const express = require('express');
const auth = require('./auth');
const user = require('./user');
const log = require('./log');
const tag = require('./tag');
const search = require('./search');

const router = express.Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/log', log);
router.use('/tag', tag);
router.use('/search', search);

module.exports = router;
