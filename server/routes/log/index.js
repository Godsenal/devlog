const express = require('express');
const log_controller = require('./controller');
const { verifyToken } = require('../../middlewares');

const router = express.Router();

router.post('/post', log_controller.log_post);

router.get('/list', log_controller.list_get); // list of logs
router.get('/log/:logId', log_controller.log_get); // one of logs

router.put('/log/:logId', log_controller.log_put);
router.put('/star', verifyToken, log_controller.star_put);

module.exports = router;
