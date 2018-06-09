const User = require('../../models/user');

exports.follow_post = (req, res) => {
  const { userId, followingId, isFollowed } = req.body;
  const update = {};
  if (isFollowed) {
    update.$pull = { followings: followingId };
  }
  else {
    update.$addToSet = { followings: followingId };
  }
  const option = {
    new: true,
    select: 'followings',
  };
  User.findByIdAndUpdate(userId, update, option, (err, user) => {
    if (err || !user) {
      return res.status.json({
        error: err,
      });
    }
    return res.json({
      followings: user.followings,
    });
  });
};

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
    if (err || !user) {
      return res.status.json({
        error: err,
      });
    }
    return res.json({
      bookmarks: user.bookmarks,
    });
  });
};

