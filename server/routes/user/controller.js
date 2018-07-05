const User = require('../../models/user');

exports.user_get = (req, res) => {
  const { nickname } = req.query;
  const findUser = (userNickname) => {
    const match = { nickname: userNickname };
    const projection = {
      username: 0,
      password: 0,
    };
    const option = {
      lean: true,
      // mongoose doesn't return plain javascript object.
      // add lean option to make mongoose return plian javacsript object.
    };
    return User.findOne(match, projection, option).populate('followings', 'nickname').exec();
  };
  const findFollower = (user, err) => {
    if (err || !user) {
      throw new Error('Cannot find user');
    }
    const match = {
      $match: {
        followings: user._id,
      },
    };
    const projection = {
      $project: {
        _id: 1,
        nickname: 1,
      },
    };
    return new Promise((resolve) => {
      User.aggregate([
        match,
        projection,
      ]).exec((_, followers) => {
        user.followers = followers || [];
        resolve(user);
      });
    });
  };
  const success = (user) => (
    res.json({
      user,
    })
  );
  const error = (err) => (
    res.status(503).json({
      error: err,
    })
  );
  findUser(nickname)
    .then(findFollower)
    .then(success)
    .catch(error);
};

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

exports.bookmark_list_get = (req, res) => {
  const { _id } = req.decoded;
  let { skip, limit } = req.query;
  skip = skip ? parseInt(skip, 10) : 0;
  limit = limit ? parseInt(limit, 10) : 10;
  const populateOption = {
    path: 'bookmarks',
    options: {
      sort: { _id: -1 },
      limit,
      skip,
    },
  };
  const query = User.findOne({ _id }).populate(populateOption).lean();
  const check = (user, err) => {
    if (err) {
      throw new Error('Database Error');
    }
    if (!user) {
      return [];
    }
    return user.bookmarks;
  };
  const addField = (bookmarks) => {
    const withCommentCount = bookmarks.map((bookmark) => {
      bookmark.comment_count = bookmark.comments.length;
      return bookmark;
    });
    return withCommentCount;
  };
  const success = (bookmarks) => (
    res.json({
      bookmarks,
    })
  );
  const error = (err) => (
    res.status(503).json({
      error: err.message,
    })
  );
  query.exec()
    .then(check)
    .then(addField)
    .then(success)
    .catch(error);
};
