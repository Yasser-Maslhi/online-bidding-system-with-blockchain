const User = require('../models/user');

exports.register = async (req, res) => {
  const { username, password, email } = req.body;
  const user = new User({ username, password, email });
  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.status(200).json({ message: 'Login successful', userId: user._id });
};
