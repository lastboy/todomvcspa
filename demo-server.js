var _path = require("path"),
    _fs = require("fs.extra"),
    _express = require('express'),
    _log = console,
    _server,
    _servermodule;

/**
 * Web Server support mainly for serving static pages
 * for testing client application with mock data
 *
 * Note: Limited for running one server
 *
 * @type {module.exports}
 */
_servermodule = function() {

    return {

        init: function() {
            var action, path;

            if (process.argv) {
                if (process.argv.length > 3) {
                    path = process.argv[3];

                } else {
                    path = ".";
                }

                path = _path.join(__dirname, path);
                if (process.argv.length > 2) {
                    action = process.argv[2];
                    if (action && _servermodule[action]) {
                        _servermodule[action].call(_servermodule, {path: path});

                    } else {
                        _log.warn("[CAT Demo server] action is not valid (start | stop)  ");
                    }
                }
            }
        },

        /**
         * Start a local web server for running an application
         *
         * @param config The passed configuration
         *      path - The path of the application
         *      port - The port of the server (optional, default: 8089)
         *
         * @returns {undefined}
         */
        start: function(config, callback) {

            var path = ((config && "path" in config) ? config.path : undefined),
                port = ((config && "port" in config) ? config.path : "8080");

            var allowCrossDomain = function(req, res, next) {
                res.header('Access-Control-Allow-Origin', req.headers.origin);
                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                next();

            };

            if (!path || (path && !_fs.existsSync(path))) {
                _log.log("[CAT Demo server] no valid location: '" + path + "'");
                return undefined;
            }

            _server = _express();

            _server.configure(function () {
                _server.set('port', process.env.PORT || port);
                _server.use(_express.logger('dev')),  /* 'default', 'short', 'tiny', 'dev' */
                _server.use(_express.bodyParser()),
                _server.use(allowCrossDomain),
                _server.use(_express.bodyParser()),
                _server.use(_express.static(path));
            });

            _server.listen(port, function() {
                _log.log("[CAT Demo server] started");
                if (callback) {
                    callback.call(this);
                }
            });
        },

        stop: function(callback) {
            if (_server) {
                _log.log("[CAT Demo server] stopped");
                if (callback) {
                    callback.call(this);
                }
                _server.close(function() {

                });
            }
        }

    };

}();

module.exports = _servermodule;

_servermodule.init();