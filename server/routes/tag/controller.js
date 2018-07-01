const Tag = require('../../models/tag');

exports.list_get = (req, res) => {
  const { q, skip, limit } = req.query;
  const query = { text: { $regex: q, $options: 'i' } };
  const docSkip = skip ? parseInt(skip, 10) : 0;
  const docLimit = limit ? parseInt(limit, 30) : 30;

  const check = (tags, err) => {
    if (err) {
      throw new Error('Database Error');
    }
    return tags;
  };
  const success = (tags) => (
    res.json({
      tags,
    })
  );
  const error = (err) => (
    res.status(503).json({
      error: err,
    })
  );
  Tag.find(query).skip(docSkip).limit(docLimit)
    .then(check)
    .then(success)
    .catch(error);
};
