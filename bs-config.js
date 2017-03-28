const fallback = require('connect-history-api-fallback');
const log = require('connect-logger');
const url = require('url');
const mongodb = require('mongodb');
const querystring = require('querystring');

const MongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://localhost:27017/ng4-mean-app';


function getDB(cb) {
  MongoClient.connect(mongoURL, function(err, db) {
    // NOTE: in a real app, you'd want to check for, and handle an error here.
    cb(db);
  });
}

const makes = [
  {
    makeName: 'Ford',
  }, {
    makeName: 'Acura',
  },
];

const models = [
  {
    makeName: 'Ford',
    modelName: 'Edge',
    imgSrc: 'https://cars.usnews.com/static/images/Auto/izmo/i6336198/2017_ford_edge_angularfront.jpg',
  }, {
    makeName: 'Ford',
    modelName: 'Escape',
    imgSrc: 'http://o.aolcdn.com/commerce/autodata/images/USC70FOS131A021001.jpg',
  }, {
    makeName: 'Acura',
    modelName: 'ILX',
    imgSrc: 'http://www.acura.com/-/media/Acura-Platform/vehicle-pages/ILX/2017/landing-page/hero-landing/mlp-hero-xsmall-2x.png',
  }, {
    makeName: 'Acura',
    modelName: 'MDX',
    imgSrc: 'https://cars.usnews.com/static/images/Auto/izmo/i2320625/2017_acura_mdx_angularfront.jpg',
  },
];


// brute-force fix up the DB every time.
getDB((db) => {
  const makesCollection = db.collection('makes');
  const modelsCollection = db.collection('models');

  makesCollection.drop(() => {
    console.log('Dropped makes collection.');
    modelsCollection.drop(() => {
    console.log('Dropped models collection.');
      const _makesCollection = db.collection('makes');
      const _modelsCollection = db.collection('models');

      _makesCollection.insertMany(makes, () => {
        console.log('Populated makes collection.');
        _modelsCollection.insertMany(models, () => {
          console.log('Populated models collection.');
        });
      });
    });
  });
});

// Middleware for serving the mongo api.
function mongoAPI(req, res, next) {
  // we only care about the urls:
  // GET /api/makes
  // GET /api/models?make=<make>
  const parsedURL = url.parse(req.url);

  if (parsedURL.pathname === '/api/makes') {
    res.setHeader('content-type', 'application/json')
    getDB(db => {
      const makesCollection = db.collection('makes');
      makesCollection.find({}).toArray((err, docs) => {
        res.end(JSON.stringify(docs));
      });
    });
  } else if (parsedURL.pathname === '/api/models') {
    res.setHeader('content-type', 'application/json')
    const options = querystring.parse(parsedURL.query);
    getDB(db => {
      const modelsCollection = db.collection('models');
      // XXX: you would never pass the query directly to mongo in prod from query string.
      modelsCollection.find(options).toArray((err, docs) => {
        res.end(JSON.stringify(docs));
      });
    });
  } else {
    next();
  }
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
