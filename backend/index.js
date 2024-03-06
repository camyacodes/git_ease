require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const port = 3000;

const mongoURI = process.env.MONGODBURI; // Replace with your MongoDB URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define a simple schema for demonstration
const userSchema = new mongoose.Schema({
  githubId: String,
  accessToken: String,
});

const User = mongoose.model('User', userSchema);

// ... Other routes and middleware ...

app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;

  const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: code,
    redirect_uri: REDIRECT_URI,
  });

  const accessToken = tokenResponse.data.access_token;

  // Example: Save user data to MongoDB
  const user = new User({ githubId: 'some-github-id', accessToken: accessToken });
  await user.save();

  // Handle the access token (store in a database, associate with user, etc.)
  res.send(`Access Token: ${accessToken}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
