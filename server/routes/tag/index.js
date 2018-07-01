const express = require('express');
const tag_controller = require('./controller');

const router = express.Router();

router.get('/list', tag_controller.list_get);

module.exports = router;
