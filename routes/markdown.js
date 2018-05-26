var server = require('markdown-serve'),
    path = require('path');

exports.handler = function(req, res, next) {
    if (req.method !== 'GET') next();

    var rootDir = path.resolve(__dirname, '../pages');

    var markdownServer = new server.MarkdownServer(rootDir); 

    markdownServer.get(req.path, function(err, result) {
        if (err) {
            next();
            return;
        }

        delete result._file;

        if (result.meta && !result.meta.draft) {
            var view = result.meta.view || 'markdown';

            res.render(view, { markdownFile: result });
        } else {
            next();
        }
    });

}
