const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 4200)
// Serve only the static files form the dist directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the app by listening on the default Heroku port
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})
