const express = require('express');
const app = express();
const port = 9000;
const cors = require('cors');
const axios = require('axios');
const path = require('path');

app.use(cors());

// accept json and url encoded values
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/v1/followers', async (req, res) => {
    const username = req.body.username;

    axios.get(`https://api.github.com/users/${username}/followers?per_page=100`)
        .then(response => {
            const followers = response.data.map(follower => follower.login);
            arrayOfFollowers = []

            followers.forEach(follower => {
                arrayOfFollowers.push(follower);
            });

            console.log(arrayOfFollowers.length);
            res.json(followers, arrayOfFollowers.length);
        })
        .catch(error => {
            if (error.response.status === 404) {
                res.status(404).json({ message: 'Username not found' });
                console.log("Username not found");
            } else {
                console.log(error);
            }
        });
});

app.post('/api/v1/following', async (req, res) => {
    const username = req.body.username;

    axios.get(`https://api.github.com/users/${username}/following?per_page=100`)
        .then(response => {
            const following = response.data.map(following => following.login);
            res.json(following);
        })
        .catch(error => {
            if (error.response.status === 404) {
                res.status(404).json({ message: 'Username not found' });
                console.log("Username not found");
            } else {
                console.log(error);
            }
        });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

