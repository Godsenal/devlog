const express = require('express');
const tag_controller = require('./controller');

const router = express.Router();

router.get('/:text', tag_controller.search_get);

module.exports = router;
