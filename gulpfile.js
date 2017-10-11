"use strict";

/**
 * モジュールを読み込み
 */

var $ = require("gulp-load-plugins")();
var autoprefixer = require("autoprefixer");
var browserSync = require("browser-sync");
var csswring = require("csswring");
var del = require("del");
var fs = require("fs");
var gulp = require("gulp");
var mqpacker = require("css-mqpacker");
var runSequence = require("run-sequence");

/**
 * 設定を読み込み
 */

var settings = require("./settings.json");

var desktopMinWidthPlaceholder = settings.breakpoints.desktopMinWidthPlaceholder;
var desktopMinWidthValue = settings.breakpoints.desktopMinWidthValue;
var palmtopMaxWidthPlaceholder = settings.breakpoints.palmtopMaxWidthPlaceholder;
var palmtopMaxWidthValue = settings.breakpoints.palmtopMaxWidthValue;

var devServerDir = settings.developmentServer;

var destDevDir = settings.directories.building.destinationForDevelopmentServer;
var destLiveDir = settings.directories.building.destinationForLiveServer;
var destTestDir = settings.directories.building.destinationForTestServer;
var srcDir = settings.directories.building.source;
var tmpDir = settings.directories.building.temporary;

var cssDir = settings.directories.site.styles;
var docDir = settings.directories.site.document;
var imgDir = settings.directories.site.images;
var incDir = settings.directories.site.documentPartials;
var jsDir = settings.directories.site.scripts;
var tplDir = settings.directories.site.templates;

/**
 * プラグインのオプション
 */

var autoprefixerOpts = {
  browsers: settings.browsers,
  cascade: false
};

var concatOpts = {
  newLine: "\n"
};

var csswringOpts = {
  removeAllComments: false
};

var sassOpts = {
  precision: 10
};

var browserSyncOpts = {
  notify: false,
  open: false,
  port: 3000,
  reloadOnRestart: true,
  server: {
    baseDir: [
      destDevDir,
      destLiveDir
    ]
  },
  ui: {
    port: 3001
  }
};

var svgminOpts = {
  plugins: [{
    removeTitle: true
  }]
};

var uglifyOpts = {
  preserveComments: "license"
};

/**
 * デフォルトの動作は削除してビルド
 */

gulp.task("default", function (callback) {
  runSequence("clean", "build", callback);
});

/**
 * 削除するタスク
 */

gulp.task("clean", function () {
  del.sync([
    destDevDir + "**/*.@(css|html|js|svg)",
    destLiveDir + "**/*.@(css|html|js|svg)",
    destTestDir + "**/*.@(css|html|js|svg)",
    tmpDir + "*"
  ], {
    dot: true
  }).map(function (path) {
    console.log("Deleted:", path);
  });
});

/**
 * ビルドするタスク
 */

gulp.task("build", function (callback) {
  runSequence([
    "build:as-is",
    "build:doc",
    "build:htaccess",
    "build:html",
    "build:jquery.js",
    "build:scripts",
    "build:styles",
    "build:svg"
  ], callback);
});

gulp.task("build:as-is", function () {
  return gulp.src([
      srcDir + "**/*",
      "!" + srcDir + "ht@(access|passwd)*",
      "!" + srcDir + cssDir + "**/*.scss",
      "!" + srcDir + docDir + "**/*.mustache",
      "!" + srcDir + imgDir + "**/*.svg",
      "!" + srcDir + jsDir + "**/*.js"
    ], {
      dot: true,
      nodir: true
    })
    .pipe($.newer(destLiveDir))
    .pipe(gulp.dest(destLiveDir));
});

gulp.task("build:doc", function () {
  return gulp.src([
      srcDir + docDir + "**/*.mustache",
      "!" + srcDir + docDir + "**/" + incDir + "*.mustache"
    ])
    .pipe($.mustache(settings.contents))
    .pipe($.rename({
      extname: ".html"
    }))
    .pipe(gulp.dest(destDevDir + docDir))
    .pipe(gulp.dest(destTestDir + docDir));
});

gulp.task("build:doc-newer", function () {
  return gulp.src([
      srcDir + docDir + "**/*.mustache",
      "!" + srcDir + docDir + "**/" + incDir + "*.mustache"
    ])
    .pipe($.newer(destDevDir + docDir))
    .pipe($.mustache(settings.contents))
    .pipe($.rename({
      extname: ".html"
    }))
    .pipe(gulp.dest(destDevDir + docDir))
    .pipe(gulp.dest(destTestDir + docDir));
});

gulp.task("build:htaccess", function (callback) {
  runSequence([
    "build:htaccess:dev",
    "build:htaccess:dist",
    "build:htaccess:test",
    "build:htpasswd:dist",
    "build:htpasswd:test"
  ], callback);
});

gulp.task("build:htaccess:dev", function () {
  fs.access(srcDir + "htaccess-dev", fs.F_OK, function (error) {
    if (!error) {
      gulp.src([
          srcDir + "htaccess",
          srcDir + "htaccess-dev"
        ])
        .pipe($.newer(destDevDir + ".htaccess"))
        .pipe($.concat(".htaccess"))
        .pipe(gulp.dest(destDevDir));
    }
  });
});

gulp.task("build:htaccess:dist", function () {
  fs.access(srcDir + "htaccess-dist", fs.F_OK, function (error) {
    if (!error) {
      gulp.src([
          srcDir + "htaccess",
          srcDir + "htaccess-dist"
        ])
        .pipe($.newer(destLiveDir + ".htaccess"))
        .pipe($.concat(".htaccess"))
        .pipe(gulp.dest(destLiveDir));
    }
  });
});

gulp.task("build:htaccess:test", function () {
  fs.access(srcDir + "htaccess-test", fs.F_OK, function (error) {
    if (!error) {
      gulp.src([
          srcDir + "htaccess",
          srcDir + "htaccess-test"
        ])
        .pipe($.newer(destTestDir + ".htaccess"))
        .pipe($.concat(".htaccess"))
        .pipe(gulp.dest(destTestDir));
    }
  });
});

gulp.task("build:htpasswd:dist", function () {
  return gulp.src(srcDir + "htpasswd-dist")
    .pipe($.newer(destLiveDir + ".htpasswd"))
    .pipe($.rename({
      basename: ".htpasswd"
    }))
    .pipe(gulp.dest(destLiveDir));
});

gulp.task("build:htpasswd:test", function () {
  return gulp.src(srcDir + "htpasswd-test")
    .pipe($.newer(destTestDir + ".htpasswd"))
    .pipe($.rename({
      basename: ".htpasswd"
    }))
    .pipe(gulp.dest(destTestDir));
});

gulp.task("build:html", function () {
  return gulp.src([
      srcDir + "**/*.mustache",
      "!" + srcDir + "**/inc/*.mustache",
      "!" + srcDir + docDir + "**/*.mustache"
    ])
    .pipe($.mustache(settings.contents))
    .pipe($.rename({
      extname: ".html"
    }))
    .pipe(gulp.dest(destLiveDir))
});

gulp.task("build:html-newer", function () {
  return gulp.src([
      srcDir + "**/*.mustache",
      "!" + srcDir + "**/inc/*.mustache",
      "!" + srcDir + docDir + "**/*.mustache"
    ])
    .pipe($.newer(destLiveDir))
    .pipe($.mustache(settings.contents))
    .pipe($.rename({
      extname: ".html"
    }))
    .pipe(gulp.dest(destLiveDir));
});

gulp.task("build:jquery.js", function () {
  return gulp.src("node_modules/jquery/dist/jquery.min.js")
    .pipe($.newer(destLiveDir + jsDir + "jquery.min.js"))
    .pipe(gulp.dest(destLiveDir + jsDir));
});

gulp.task("build:scripts", function (callback) {
  runSequence([
    "build:scripts:as-is",
    "build:scripts:main",
    "build:scripts:precedence",
    "build:scripts:singles"
  ], callback);
});

gulp.task("build:scripts:as-is", function () {
  return gulp.src(srcDir + jsDir + "as-is/*.js")
    .pipe($.newer(destLiveDir + jsDir))
    .pipe(gulp.dest(destLiveDir + jsDir));
});

gulp.task("build:scripts:main", function () {
  return gulp.src(srcDir + jsDir + "main/*.js")
    .pipe($.newer(destLiveDir + jsDir + "main.js"))
    .pipe($.uglify(uglifyOpts))
    .pipe(gulp.dest(tmpDir + jsDir + "main/"))
    .pipe($.concat("main.js", concatOpts))
    .pipe(gulp.dest(destLiveDir + jsDir));
});

gulp.task("build:scripts:precedence", function () {
  return gulp.src(srcDir + jsDir + "precedence/*.js")
    .pipe($.newer(destLiveDir + jsDir + "precedence.js"))
    .pipe($.replace(desktopMinWidthPlaceholder, desktopMinWidthValue))
    .pipe($.replace(palmtopMaxWidthPlaceholder, palmtopMaxWidthValue))
    .pipe($.uglify(uglifyOpts))
    .pipe(gulp.dest(tmpDir + jsDir + "precedence/"))
    .pipe($.concat("precedence.js", concatOpts))
    .pipe(gulp.dest(destLiveDir + jsDir));
});

gulp.task("build:scripts:singles", function () {
  return gulp.src(srcDir + jsDir + "*.js")
    .pipe($.newer(destLiveDir + jsDir))
    .pipe($.uglify(uglifyOpts))
    .pipe(gulp.dest(destLiveDir + jsDir));
});

gulp.task("build:styles", function (callback) {
  runSequence("build:styles:scss", "build:styles:css", callback);
});

gulp.task("build:styles:css", function () {
  return gulp.src([
      srcDir + cssDir + "*.scss",
      "!" + srcDir + cssDir + "_*.scss"
    ])
    .pipe($.sass(sassOpts))
    .pipe($.postcss([mqpacker()]))
    .pipe($.csscomb())
    .pipe($.postcss([autoprefixer(autoprefixerOpts)]))
    .pipe(gulp.dest(tmpDir + cssDir))
    .pipe($.postcss([csswring(csswringOpts)]))
    .pipe(gulp.dest(destLiveDir + cssDir));
});

gulp.task("build:styles:scss", function () {
  return gulp.src(srcDir + cssDir + "**/*.src.scss")
    .pipe($.replace(desktopMinWidthPlaceholder, desktopMinWidthValue))
    .pipe($.replace(palmtopMaxWidthPlaceholder, palmtopMaxWidthValue))
    .pipe($.rename(function (path) {
      path.basename = path.basename.replace(/\.src$/, ".built");
      return path;
    }))
    .pipe(gulp.dest(srcDir + cssDir));
});

gulp.task("build:svg", function (callback) {
  runSequence([
    "build:svg:dist",
    "build:svg:dummy"
  ], callback);
});

gulp.task("build:svg:dist", function () {
  return gulp.src([
      srcDir + imgDir + "**/*.svg",
      "!" + srcDir + imgDir + "**/dummy/*.svg"
    ])
    .pipe($.newer(destLiveDir + imgDir))
    .pipe($.svgmin(svgminOpts))
    .pipe(gulp.dest(destLiveDir + imgDir));
});

gulp.task("build:svg:dummy", function () {
  return gulp.src(srcDir + imgDir + "**/dummy/*.svg")
    .pipe($.newer(destDevDir + imgDir))
    .pipe($.svgmin(svgminOpts))
    .pipe(gulp.dest(destDevDir + imgDir))
    .pipe(gulp.dest(destTestDir + imgDir));
});

/**
 * 開発サーバにプットするタスク
 */

gulp.task("put", function () {
  gulp.src([
      destDevDir + "**/*",
      destLiveDir + "**/*"
    ], {
      dot: true
    })
    .pipe($.newer(devServerDir))
    .pipe(gulp.dest(devServerDir));
});

gulp.task("put:templates", function () {
  gulp.src(srcDir + "**/" + tplDir + "*")
    .pipe($.newer(devServerDir))
    .pipe(gulp.dest(devServerDir));
});

/**
 * ローカルサーバを起動してファイルの変更を監視するタスク
 */

gulp.task("watch", function () {
  browserSync(browserSyncOpts);

  gulp.watch([
    srcDir + "**/*",
    "!" + srcDir + "ht@(access|passwd)*",
    "!" + srcDir + cssDir + "**/*.scss",
    "!" + srcDir + docDir + "**/*.mustache",
    "!" + srcDir + imgDir + "**/*.@(gif|jpg|png|svg)",
    "!" + srcDir + jsDir + "**/*.js"
  ], [
    "build:as-is",
    browserSync.reload
  ]);

  gulp.watch([
    srcDir + docDir + "**/*.mustache",
    "!" + srcDir + docDir + "**/" + incDir + "*.mustache"
  ], [
    "build:doc-newer",
    browserSync.reload
  ]);

  gulp.watch([
    srcDir + "**/*.mustache",
    "!" + srcDir + "**/inc/*.mustache",
    "!" + srcDir + docDir + "**/*.mustache"
  ], ["build:html-newer"]);

  gulp.watch(srcDir + docDir + "**/" + incDir + "*.mustache", [
    "build:doc",
    browserSync.reload
  ]);

  gulp.watch(srcDir + "ht@(access|passwd)*", [
    "build:htaccess",
    browserSync.reload
  ]);

  gulp.watch(srcDir + imgDir + "**/*.svg", [
    "build:svg",
    browserSync.reload
  ]);

  gulp.watch(srcDir + jsDir + "**/*.js", [
    "build:scripts",
    browserSync.reload
  ]);

  gulp.watch([
    srcDir + cssDir + "**/*.scss",
    "!" + srcDir + cssDir + "**/*.built.scss"
  ], [
    "build:styles",
    browserSync.reload
  ]);

  gulp.watch(srcDir + "**/" + tplDir + "*", [
    "put:templates",
    browserSync.reload
  ]);
});
