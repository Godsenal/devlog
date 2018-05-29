const Log = require('../../models/log');

exports.log_post = function log_post(req, res) {
  const { log } = req.body;
  const newLog = new Log(log);
  const check = (err, logData) => {
    if (err) {
      return 'Database Error';
    }
    return logData;
  };
  const success = (logData) => (
    res.json({
      log: logData,
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
  const { logId } = req.query;
  let { limit } = req.query;
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
  // if last log ID query exist, get list after logId
  if (logId) {
    query._id = { $gte: logId };
  }
  // if limit query doesn't exist, set limit as default value '10'
  if (!limit) {
    limit = 10;
  }
  else {
    limit = parseInt(limit, 10);
  }
  // NOTE: Empty result is NOT Error
  const check = (logs, err) => {
    if (err) {
      return 'Database Error';
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
    .limit(limit)
    .sort(sort)
    .exec()
    .then(check)
    .then(success)
    .catch(error);
};

exports.log_get = function log_get(req, res) {
  res.json({

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
