const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', (req, res) => {
    const username = req.body.username;
    const uid = uuidv4();
    const data = `${username},${uid}\n`;

    fs.appendFile('data.txt', data, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json({ username, uid });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
