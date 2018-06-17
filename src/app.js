const express = require('express');
const bodyParser = require('body-parser');

// Create global app object
const app = express();

// Normal express config defaults
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./controllers'));

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development error handler
app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);
    res.json({ 'errors': {
        message: err.message,
        error: err,
    } });
});

// Start server
const server = app.listen( process.env.PORT || 3000, function() {
  console.log('Listening on port ' + server.address().port);
});
