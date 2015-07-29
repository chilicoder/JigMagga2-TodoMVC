var gulp = require('gulp'),
    connect = require('gulp-connect'),
    Browserify = require("browserify"),
    JSX = require("browserify-jsx"),
    Magga = require("Magga/src/browserify");

gulp.task('webserver', function () {
    connect.server({
        middleware: function (connect, opt) {
            return [
                function (req, res, next) {
                    if (req.url && req.url.indexOf(".js") !== -1) {
                        var magga = Magga.getInstance(),
                            browserify = Browserify({debug: true});

                        magga.browserifyPlugin(browserify);
                        browserify
                        	.transform(JSX)
                            .transform(magga.browserifyConfTransform())
                            .add(__dirname + req.url)
                            .bundle().pipe(res);

                    } else {
                        next();
                    }

                }
            ]
        }
    });
});

gulp.task('default', ['webserver']);