const express = require('express');
const app = express();
const fs = require('fs');
app.listen(3000);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(fs.readFileSync('public/index.html', 'utf8'));
});