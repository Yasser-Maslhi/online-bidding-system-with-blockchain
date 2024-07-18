const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const app = express();

mongoose.connect('mongodb://localhost:27017/bidding-system', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

// User Registration
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered');
});

// User Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret');
    res.json({ token });
});

app.listen(3000, () => {
    console.log('User Service running on port 3000');
});
