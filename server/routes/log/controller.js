const Log = require('../../models/log');
const Tag = require('../../models/tag');

exports.log_post = async function log_post(req, res) {
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
        author_id: savedLog.author_id,
        author_nickname: savedLog.author_nickname,
        created: savedLog.created,
        comment_count: 0,
        stars: savedLog.stars,
        tags: savedLog.tags,
      },
    })
  );
  const error = (err) => (
    res.status(503).json({
      error: err,
    })
  );
  const documents = log.tags.map(tag => ({ name: tag }));
  const option = { ordered: false };
  Tag.insertMany(documents, option, () => {
    newLog.save()
      .then(check)
      .then(success)
      .catch(error);
  });
};

exports.list_get = function list_get(req, res) {
  const { min_id, author_nickname, star_user_id } = req.query;
  let { skip, limit } = req.query;
  const query = {};
  const projection = {
    _id: 1,
    text: 1,
    has_code: 1,
    author_id: 1,
    author_nickname: 1,
    created: 1,
    comment_count: { $size: '$comments' },
    stars: 1,
  };
  const sort = {
    _id: -1,
  };
  // get list below min_id( when log added )
  if (min_id) {
    query._id = { $lte: min_id };
  }
  if (author_nickname) {
    query.author_nickname = author_nickname;
  }
  if (star_user_id) {
    query.stars = star_user_id;
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
  const error = (err) => {
    res.status(503).json({
      error: err,
    });
  };
  Log.aggregate([
    { $match: query },
    { $project: projection },
    { $sort: sort },
    { $skip: skip },
    { $limit: limit },
  ]).exec()
    .then(check)
    .then(success)
    .catch(error);
};

exports.log_get = function log_get(req, res) {
  const { logId } = req.params;
  // use 'slice' to get reversed comments
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
  const { logId, userId, isStared } = req.body;
  // if starred, unstar. otherwise, star.
  let update = {
    $addToSet: { stars: userId },
  };
  if (isStared) {
    update = {
      $pull: { stars: userId },
    };
  }
  const option = {
    new: true,
    select: 'stars',
  };
  Log.findByIdAndUpdate(logId, update, option, (err, log) => {
    if (err) {
      return res.status(503).json({
        error: err,
      });
    }
    res.json({
      stars: log.stars,
    });
  });
};

exports.comment_post = (req, res) => {
  const { comment } = req.body;
  const { thread_id } = comment;
  const update = {
    $push: {
      comments: {
        $each: [comment],
        $sort: { _id: -1 },
      },
    },
  };
  const option = { new: true, select: 'comments' };
  const findLogAndSave = Log.findByIdAndUpdate(thread_id, update, option);
  const check = (log, err) => {
    if (err) {
      throw new Error('Fail to save comment.');
    }
    return { comment: log.comments[0], comments: log.comments };
  };
  const success = (result) => res.json({ ...result });
  const error = (err) => res.status(503).json({ error: err });
  findLogAndSave.exec()
    .then(check)
    .then(success)
    .catch(error);
};

exports.comment_list = (req, res) => {
  const { log_id } = req.query;
  const projection = {
    comments: 1,
  };
  Log.findById(log_id, projection, (err, log) => {
    if (err) {
      return res.status(503).json({ error: 'Database error. Cannot find log.' });
    }
    return res.json({
      comments: log.comments,
    });
  });
};
