const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(path.join(__dirname, 'src')));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/kaizen-talent-app/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4200);
