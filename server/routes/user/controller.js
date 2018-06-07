const User = require('../../models/user');

exports.bookmark_post = (req, res) => {
  const { userId, logId, isBookmarked } = req.body;
  let update = {
    $addToSet: { bookmarks: logId },
  };
  if (isBookmarked) {
    update = {
      $pull: { bookmarks: logId },
    };
  }
  const option = {
    new: true,
    select: 'bookmarks',
  };
  User.findByIdAndUpdate(userId, update, option, (err, user) => {
    if (err) {
      return res.status.json({
        error: err,
      });
    }
    return res.json({
      bookmarks: user.bookmarks,
    });
  });
};

