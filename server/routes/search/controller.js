const User = require('../../models/user');
const Log = require('../../models/log');
const Tag = require('../../models/tag');

exports.search_get = function search_get(req, res) {
  const { q } = req.query;
  const query = { $regex: q, $options: 'i' };
  const userQuery = { nickname: query };
  const tagQuery = { name: query };

  const userProjection = { nickname: 1, imageUrl: 1 };
  const tagProjection = { name: 1 };
  const findUser = () => (
    new Promise((resolve, reject) => {
      User.find(userQuery, userProjection).limit(5).exec((err, users) => {
        if (err) {
          reject(err);
        }
        resolve({ users });
      });
    })
  );
  const findTag = (payload) => (
    new Promise((resolve, reject) => {
      Tag.find(tagQuery, tagProjection).limit(5).exec((err, tags) => {
        if (err) {
          reject(err);
        }
        resolve({ tags, ...payload });
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
    .then(findTag)
    .then(success)
    .catch(error);
};

exports.users_get = function users_get(req, res) {
  const { skip, limit, q } = req.query;
  const query = { nickname: { $regex: q, $options: 'i' } };
  const projection = { nickname: 1, imageUrl: 1 };
  const parsedSkip = skip ? parseInt(skip, 10) : 0;
  const parsedLimit = limit ? parseInt(limit, 10) : 10;
  const check = (users, err) => {
    if (err) {
      throw new Error('Database error');
    }
    return users;
  };
  const success = (users) => res.json({ users });
  const error = (err) => res.status(503).json({ error: err.message });
  User.find(query, projection)
    .skip(parsedSkip)
    .limit(parsedLimit)
    .then(check)
    .then(success)
    .catch(error);
};

exports.logs_get = function logs_get(req, res) {
  const { skip, limit, q } = req.query;
  const query = { text: { $regex: q, $options: 'i' } };
  const projection = {
    _id: 1,
    text: 1,
    has_code: 1,
    author: 1,
    created: 1,
    comment_count: { $size: '$comments' },
    stars: 1,
  };
  const author_lookup = {
    from: 'users',
    let: { author_id: '$author' },
    pipeline: [
      {
        $match: {
          $expr: {
            $eq: ['$_id', '$$author_id'],
          },
        },
      },
      {
        $project: { _id: 1, nickname: 1, imageUrl: 1 },
      },
    ],
    as: 'author',
  };
  const author_unwind = '$author';
  const sort = { _id: -1 };
  const parsedSkip = skip ? parseInt(skip, 10) : 0;
  const parsedLimit = limit ? parseInt(limit, 10) : 10;
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
    { $skip: parsedSkip },
    { $limit: parsedLimit },
    { $lookup: author_lookup },
    { $unwind: author_unwind },
  ]).exec()
    .then(check)
    .then(success)
    .catch(error);
};

exports.tags_get = function tags_get(req, res) {
  const { skip, limit, q } = req.query;
  const query = { name: { $regex: q, $options: 'i' } };
  const projection = { name: 1 };
  const parsedSkip = skip ? parseInt(skip, 10) : 0;
  const parsedLimit = limit ? parseInt(limit, 10) : 30;
  const check = (tags, err) => {
    if (err) {
      throw new Error('Database error');
    }
    return tags;
  };
  const success = (tags) => res.json({ tags });
  const error = (err) => res.status(503).json({ error: err.message });
  Tag.find(query, projection)
    .skip(parsedSkip)
    .limit(parsedLimit)
    .then(check)
    .then(success)
    .catch(error);
};
