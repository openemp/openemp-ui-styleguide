const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 9002;

// serve static assets normally
app.use(cors());
app.use(express.static(`${__dirname}/dist`));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'dist/openemp-mf-styleguide.js'));
});

app.listen(port);
console.log(`server started on port ${port}`);
