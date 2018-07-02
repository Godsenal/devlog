const express = require('express');
const search_controller = require('./controller');

const router = express.Router();

router.get('/', search_controller.search_get);
router.get('/users', search_controller.users_get);
router.get('/logs', search_controller.logs_get);
router.get('/tags', search_controller.tags_get);

module.exports = router;
