const Log = require('../../models/log');

exports.log_post = function log_post(req, res) {
  const { log } = req.body;
  const newLog = new Log(log);
  const check = (savedLog, err) => {
    if (err) {
      return 'Database Error';
    }
    return savedLog;
  };
  const success = (savedLog) => (
    res.json({
      log: {
        _id: savedLog._id,
        text: savedLog.text,
        has_code: savedLog.has_code,
        author_nickname: savedLog.author_nickname,
        created: savedLog.created,
      },
    })
  );
  const error = (err) => (
    res.status(503).json({
      error: err,
    })
  );
  newLog.save()
    .then(check)
    .then(success)
    .catch(error);
};

exports.list_get = function list_get(req, res) {
  const { min_id } = req.query;
  let { skip, limit } = req.query;
  const query = {};
  const projection = {
    _id: 1,
    text: 1,
    has_code: 1,
    author_nickname: 1,
    created: 1,
  };
  const sort = {
    _id: -1,
  };
  // get list below min_id( when log added )
  if (min_id) {
    query._id = { $lte: min_id };
  }
  skip = skip ? parseInt(skip, 10) : 0;
  limit = limit ? parseInt(limit, 10) : 10;
  // NOTE: Empty result is NOT Error
  const check = (logs, err) => {
    if (err) {
      throw new Error('Database Error');
    }
    return logs;
  };
  const success = (logs) => (
    res.json({
      logs,
    })
  );
  const error = (err) => (
    res.status(503).json({
      error: err,
    })
  );

  Log.find(query, projection)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .exec()
    .then(check)
    .then(success)
    .catch(error);
};

exports.log_get = function log_get(req, res) {
  const { logId } = req.params;
  Log.findById(logId, (err, log) => {
    if (err) {
      return res.status(503).json({
        error: 'Database Error',
      });
    }
    return res.json({
      log,
    });
  });
};

exports.log_put = function log_put(req, res) {
  res.json({

  });
};

exports.star_put = function star_put(req, res) {
  res.json({

  });
};
