const express = require('express');
const path = require('path');
const os = require('os');
const morgan = require('morgan');
const errorHandler = require('errorhandler');
const markdown = require('./routes/markdown');
const { log } = console;

const app = express();
const PORT = process.env.PORT || 3000;

const getTweets = require('./twitter');

app.set('port', PORT);
app.set('views', path.resolve(__dirname, 'partials'));
app.set('view engine', 'pug');
app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, 'public')));

if ('development' == app.get('env')) {
    app.use(errorHandler());
    app.set('host', 'http://localhost');
}

app.get('/tweets', (req, res, err) => {
    getTweets(res);
})

app.get('*', markdown.handler);

app.listen(PORT, function(){
    let host = (app.get('host') || os.hostname() || 'unknown');

    log(`Express server listening at ${ host }:${ PORT }`);
});
