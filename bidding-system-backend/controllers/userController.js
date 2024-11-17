const User = require('../models/user');

exports.register = async (req, res) => {
  const { username, password, email } = req.body;
  const user = new User({ username, password, email });
  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
};

// exports.login = async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username, password });
//   if (!user) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }
//   res.status(200).json({ message: 'Login successful', userId: user._id });
// };
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords directly (since no hashing is used)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      userId: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
};

exports.getProfile = async (req, res) => {
  try {
      const { username } = req.query; // Accept `username` as a query parameter

      if (!username) {
          return res.status(400).json({ message: 'Username is required' });
      }

      // Fetch the user from the database
      const user = await User.findOne({ username }).select('-password'); // Exclude password

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
  } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ error: 'Error fetching profile' });
  }
};
