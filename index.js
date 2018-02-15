var express = require('express'),
    path = require('path'),
    os = require('os'),
    logger = require('morgan'),
    errorHandler = require('errorhandler'),
    markdown = require('./routes/markdown');

var app = express();

const PORT = process.env.PORT || 3000

// all environments
app.set('port', PORT);
app.set('views', path.resolve(__dirname, 'partials'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.static(path.resolve(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
    app.set('host', 'http://localhost');
}

app.get('/tweets', (req, res, err) => {
    res.send('asdasdasd')
})

app.get('*', markdown.handler);

app.listen(PORT, function(){
    var host = (app.get('host') || os.hostname() || 'unknown') + ':' + PORT;

    console.log('Express server listening at ' + host);
});
