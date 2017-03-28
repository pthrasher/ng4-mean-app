const fallback = require('connect-history-api-fallback');
const log = require('connect-logger');
const url = require('url');
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://localhost:27017/ng4-mean-app';


function getDB(cb) {
  MongoClient.connect(mongoURL, function(err, db) {
    // NOTE: in a real app, you'd want to check for, and handle an error here.
    cb(db);
  });
}

function mongoAPI(req, res, next) {
  // we only care about the urls:
  // GET /api/makes
  // GET /api/models?make=<make>
  next();
}

module.exports = {
  injectChanges: false, // workaround for Angular 2 styleUrls loading
  files: ['./**/*.{html,htm,css,js}'],
  watchOptions: {
    ignored: 'node_modules'
  },
  server: {
    baseDir: 'src',
    routes: {
      "/node_modules": "node_modules",
    },
    middleware: [
      log({ format: '%date %status %method %url' }),
      mongoAPI,
      fallback({
        index: '/index.html',
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'] // systemjs workaround
      })
    ]
  }
};
