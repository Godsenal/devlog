const express = require('express');
const post_controller = require('./controller');

const router = express.Router();

router.post('/', post_controller.index_post);

router.get('/list', post_controller.list_get);
router.get('/post/:postid', post_controller.post_get);

router.put('/post/:postid', post_controller.post_put);
router.put('/star/:postid', post_controller.star_put);

module.exports = router;
