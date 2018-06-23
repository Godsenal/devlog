const User = require('../../models/user');
const Log = require('../../models/log');

exports.search_get = function search_get(req, res) {
  const { q } = req.query;
  const query = { $regex: q, $options: 'i' };
  const userQuery = { nickname: query };
  const logQuery = { text: query };

  const userProjection = { nickname: 1 };
  const logProjection = { author_nickname: 1, text: 1, stars: 1 };
  const findUser = () => (
    new Promise((resolve, reject) => {
      User.find(userQuery, userProjection).limit(10).exec((err, users) => {
        if (err) {
          reject(err);
        }
        resolve({ users });
      });
    })
  );
  const findLog = (payload) => (
    new Promise((resolve, reject) => {
      Log.find(logQuery, logProjection).limit(10).exec((err, logs) => {
        if (err) {
          reject(err);
        }
        resolve({ logs, ...payload });
      });
    })
  );
  const success = (payload) => (
    res.json({
      result: payload,
    })
  );
  const error = (err) => res.status(503).json({ err });
  findUser()
    .then(findLog)
    .then(success)
    .catch(error);
};

exports.users_get = function users_get(req, res) {
  const { skip, limit, q } = req.query;
  const query = { nickname: { $regex: q, $options: 'i' } };
  const projection = { author_nickname: 1, text: 1, stars: 1 };
  const check = (users, err) => {
    if (err) {
      throw new Error('Database error');
    }
    return users;
  };
  const success = (users) => res.json({ users });
  const error = (err) => res.status(503).json({ error: err.message });
  User.find(query, projection)
    .skip(skip || 0)
    .limit(limit || 10)
    .then(check)
    .then(success)
    .catch(error);
};

exports.logs_get = function users_get(req, res) {
  const { skip, limit, q } = req.query;
  const query = { text: { $regex: q, $options: 'i' } };
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
  const sort = { _id: -1 };
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
      error: err.message,
    })
  );

  Log.aggregate([
    { $match: query },
    { $project: projection },
    { $sort: sort },
    { $skip: skip || 0 },
    { $limit: limit || 10 },
  ]).exec()
    .then(check)
    .then(success)
    .catch(error);
};
