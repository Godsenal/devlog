const Tag = require('../../models/tag');

exports.search_get = (req, res) => {
  const searchReg = `.*${req.params.text}.*`;
  const success = tags => res.json({ tags });
  const error = err => res.status(500).json({ error: err });
  Tag.find({ name: { $regex: searchReg, $options: 'i' } }).exec()
    .then(success)
    .catch(error);
};
