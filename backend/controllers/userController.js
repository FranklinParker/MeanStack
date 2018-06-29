const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.createUser = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hash
    });
    const userData = await user.save();
    res.status(201).json({
      message: 'Added user',
      user: userData
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: e
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
      return res.status(401).json({message: 'Auth Failed'});
    }
    const passwordIsValid = await bcrypt.compare(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({message: 'Auth Failed'});
    }
    const token = jwt.sign({email: user.email, userId: user._id},
      process.env.JWT_KEY
      , {expiresIn: '1h'});
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: user._id
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: e
    });
  }
}
