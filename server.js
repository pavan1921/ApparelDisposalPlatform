const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Store submissions in an array (for simplicity)
let submissions = [];
let users = []; // To store user registrations
let admins = []; // To store admin registrations

// Load previous submissions from data.json
const loadSubmissions = () => {
    if (fs.existsSync('data.json')) {
        const data = fs.readFileSync('data.json');
        submissions = JSON.parse(data);
    }
};

loadSubmissions();

// Route to handle submission of apparel data
app.post('/submit', (req, res) => {
    const submission = req.body;
    submissions.push(submission);
    fs.writeFileSync('data.json', JSON.stringify(submissions)); // Save to file
    console.log(submissions); // For debugging, print submissions to the console
    res.status(201).send('Submission received!');
});

// Route to retrieve all submissions
app.get('/submissions', (req, res) => {
    res.status(200).json(submissions); // Returns all the submitted data as JSON
});

// User registration
app.post('/signup', (req, res) => {
    const username = req.body.username;
    if (username.length === 10 && !users.includes(username)) {
        users.push(username);
        res.status(201).send('User registered successfully!');
    } else {
        res.status(400).send('Invalid username. Must be 10 digits and unique.');
    }
});

// Admin registration
app.post('/admin_signup', (req, res) => {
    const adminUsername = req.body.adminUsername;
    if (adminUsername.length === 4 && !admins.includes(adminUsername)) {
        admins.push(adminUsername);
        res.status(201).send('Admin registered successfully!');
    } else {
        res.status(400).send('Invalid admin username. Must be 4 digits and unique.');
    }
});

// Login handling (basic)
app.post('/login', (req, res) => {
    const username = req.body.username;
    if (users.includes(username) || admins.includes(username)) {
        res.status(200).send('Login successful!');
    } else {
        res.status(401).send('Invalid credentials.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
app.get('/submissions', (req, res) => {
  res.json(submissions); // Assuming submissions holds all submitted data
});
